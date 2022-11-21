using BCrypt;
using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Roles;
using Sabio.Models.Domain.Users;
using Sabio.Models.Requests.Users;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Sabio.Services
{
    public class UserService : IUserService
    {
        private IAuthenticationService<int> _authenticationService;
        private IDataProvider _dataProvider;

        public UserService(IAuthenticationService<int> authSerice, IDataProvider dataProvider)
        {
            _authenticationService = authSerice;
            _dataProvider = dataProvider;
        }

        public int UpdatePassword(string password, string token, string email)
        { 
            string procName = "[dbo].[Users_UpdatePassword]";
            string salt = BCrypt.BCryptHelper.GenerateSalt();
            string hashedPassword = BCrypt.BCryptHelper.HashPassword(password, salt);
            int rowAffected = 0;

            _dataProvider.ExecuteCmd(procName
                , inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Password", hashedPassword);
                    paramCollection.AddWithValue("@Token", token);
                    paramCollection.AddWithValue("@Email", email);

                }, singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    rowAffected = reader.GetSafeInt32(0);
                });

            return rowAffected;
 
        }

        public int ForgetPasswordTokenInsert(string email, string token, int tokenType)
        {
            string procName = "[dbo].[Users_Select_AuthData]";
            int id = 0;

            _dataProvider.ExecuteCmd(procName
                , inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Email", email);
                }
                , singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    id = reader.GetSafeInt32(0);
                });

            if (id != 0)
            {              
                AddToken(token, id, tokenType);
            }

            return id;
        }

        public async Task<bool> LogInAsync(string email, string password)
        {
            bool isSuccessful = false;

            IUserAuthData response = Get(email, password);

            if (response != null)
            {
                await _authenticationService.LogInAsync(response);
                isSuccessful = true;
            }

            return isSuccessful;
        }

        public async Task<bool> LogInTest(string email, string password, int id, string[] roles = null)
        {
            bool isSuccessful = false;
            var testRoles = new[] { "User", "Super", "Admin" };

            var allRoles = roles == null ? testRoles : testRoles.Concat(roles);

            IUserAuthData response = new UserBase
            {
                Id = id
                ,
                Name = email
                ,
                Roles = allRoles
                ,
                TenantId = "Acme Corp UId"
            };

            Claim fullName = new Claim("CustomClaim", "Sabio Bootcamp");
            await _authenticationService.LogInAsync(response, new Claim[] { fullName });

            return isSuccessful;
        }

        public int Create(UserAddRequest model)
        {
            //make sure the password column can hold long enough string. put it to 100 to be safe

            int userId = 0;
            string password = model.Password;
            string salt = BCrypt.BCryptHelper.GenerateSalt();
            string hashedPassword = BCrypt.BCryptHelper.HashPassword(password, salt);

   
            string procName = "[dbo].[Users_Insert]";

            _dataProvider.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col, salt);

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);
                }, returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;

                    int.TryParse(oId.ToString(), out userId);
                });
         

            return userId;
        }

        /// <summary>
        /// Gets the Data call to get a give user
        /// </summary>
        /// <param name="email"></param>
        /// <param name="passwordHash"></param>
        /// <returns></returns>
        private IUserAuthData Get(string email, string password)
        {
            UserBase user = null;
            UserAuth userFromDb = null;

            //get user object from db;
            string procName = "[dbo].[Users_Select_AuthData]";    // IsConfirmed NEEDS TO BE TRUE, SO AS STATUS ACTIVE

            _dataProvider.ExecuteCmd(procName,
                delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@Email", email);

                }, delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    userFromDb = new UserAuth();

                    userFromDb.Id = reader.GetSafeInt32(startingIndex++);
                    userFromDb.Email = reader.GetSafeString(startingIndex++);
                    userFromDb.Password = reader.GetSafeString(startingIndex++);
                    userFromDb.Roles = reader.DeserializeObject<List<Role>>(startingIndex++);
                });

            if (userFromDb != null)
            {
                bool isValidCredentials = BCrypt.BCryptHelper.CheckPassword(password, userFromDb.Password);

                if (isValidCredentials)
                {
                    user = new UserBase();
                    user.Id = userFromDb.Id;
                    user.Name = userFromDb.Email;
                    user.Roles = userFromDb.Roles.Select(x => x.Name).ToArray();
                    user.TenantId = "TenantIdWillGoHere";
                }
            }
            return user;
        }

        public void AddToken(string token, int userId, int tokenTypeId)
        {
            string procName = "[dbo].[UserTokens_Insert]";

            _dataProvider.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Token", token);
                    col.AddWithValue("@UserId", userId);
                    col.AddWithValue("@TokenType", tokenTypeId);
                }, returnParameters: null);
        }
        public void Update(UserUpdateRequest model)
        {
            string procName = "[dbo].[Users_Update]";

            _dataProvider.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", model.Id);
                    col.AddWithValue("@FirstName", model.FirstName);
                    col.AddWithValue("@LastName", model.LastName);
                    col.AddWithValue("@Mi", model.Mi);
                    col.AddWithValue("@Title", model.Title);
                    col.AddWithValue("@AvatarUrl", model.AvatarUrl);
                },
                returnParameters: null);
        }
        
        public void UpdateStatus(int id, int statusTypeId)
        {
            string procName = "[dbo].[Users_UpdateStatus]";

            _dataProvider.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);
                    col.AddWithValue("@StatusTypeId", statusTypeId);
                },
                returnParameters: null); 
        }

        public void Confirm(string token)
        {
            string procName = "[dbo].[Users_Confirm]";

            _dataProvider.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Token", token);
                },
                returnParameters: null); 
        }

        public User GetById(int id)
        {
            string procName = "[dbo].[Users_SelectById]";

            User aUser = null;

            _dataProvider.ExecuteCmd(procName,
                delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@Id", id);
                }, delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    aUser = MapSingleUser(reader, ref startingIndex);
                });

            return aUser;
        }

        public UserPass GetByEmail(string email)
        {
            string procName = "[dbo].[Users_SelectPass_ByEmail]";

            UserPass userPass = new UserPass();

            _dataProvider.ExecuteCmd(procName,
                delegate (SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@Email", email);

                }, delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    userPass.Password = reader.GetSafeString(startingIndex++);
                });
            return userPass; 
        }

        public Paged<User> GetAll(int pageIndex, int pageSize)
        {
            Paged<User> pagedList = null;
            List<User> list = null;
            string procName = "[dbo].[Users_SelectAll]";
            int totalCount = 0;

            _dataProvider.ExecuteCmd(procName,
                delegate(SqlParameterCollection parameterCollection)
                {
                    parameterCollection.AddWithValue("@PageIndex", pageIndex);
                    parameterCollection.AddWithValue("@PageSize", pageSize);
                }, delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    User aUser = MapSingleUser(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(startingIndex++);
                    if (list == null)
                    {
                        list = new List<User>(); 
                    }
                    list.Add(aUser); 
                });
            if (list != null)
            {
                pagedList = new Paged<User>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }




        public User MapSingleUser(IDataReader reader, ref int startingIndex)
        {
            User aUser = new User();

            aUser.Id = reader.GetSafeInt32(startingIndex++);
            aUser.Email = reader.GetSafeString(startingIndex++);
            aUser.Title = reader.GetSafeString(startingIndex++);
            aUser.FirstName = reader.GetSafeString(startingIndex++);
            aUser.LastName = reader.GetSafeString(startingIndex++);
            aUser.Mi = reader.GetSafeString(startingIndex++);
            aUser.AvatarUrl = reader.GetSafeString(startingIndex++);
            aUser.IsConfirmed = reader.GetSafeBool(startingIndex++);
            aUser.StatusTypeId = reader.GetSafeInt32(startingIndex++);
            aUser.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aUser.DateModified = reader.GetSafeDateTime(startingIndex++);

            return aUser;
        }

        private static void AddCommonParams(UserAddRequest model, SqlParameterCollection col, string salt)
        {
            col.AddWithValue("@Email", model.Email);
            col.AddWithValue("@Title", model.Title);
            col.AddWithValue("@FirstName", model.FirstName);
            col.AddWithValue("@LastName", model.LastName);
            col.AddWithValue("@Mi", model.Mi);
            col.AddWithValue("@Password", BCrypt.BCryptHelper.HashPassword(model.Password, salt));
            col.AddWithValue("@AvatarUrl", model.AvatarUrl);
           
        }
    }
}

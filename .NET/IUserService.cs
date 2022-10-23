using Sabio.Models;
using Sabio.Models.Domain.Users;
using Sabio.Models.Requests.Users;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public interface IUserService
    {
        int Create(UserAddRequest model);

        Task<bool> LogInAsync(string email, string password);

        Task<bool> LogInTest(string email, string password, int id, string[] roles = null); 
        void Update(UserUpdateRequest model);
        void UpdateStatus(int id, int statusTypeId);
        void Confirm(string token);
        User GetById(int id); 
        UserPass GetByEmail(string email);
        Paged<User> GetAll(int PageIndex, int PageSize);
        void AddToken(string token, int id, int v);
        int ForgetPasswordTokenInsert(string email, string token, int tokenType);
        int UpdatePassword(string password, string token, string email);
        User MapSingleUser(IDataReader reader, ref int startingIndex);
    }
}
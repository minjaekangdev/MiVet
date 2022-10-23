using Sabio.Models.Domain.Roles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Users
{
    public class UserAuth : UserPass
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public List<Role> Roles { get; set; }
    }
}

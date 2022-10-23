using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Users
{
    public class UserLoginRequest
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        [MinLength(3)]
        [MaxLength(255)]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}

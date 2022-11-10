using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Users
{
    public class UserUpdateRequest : IModelIdentifier  
    {
        [Required]
        [Range(1,int.MaxValue)]
        public int Id { get; set; }
        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        public string FirstName { get; set; } 
        [Required]
        [MinLength(1)]
        [MaxLength(100)]
        public string LastName { get; set; } 
        [MaxLength(2)]
        public string Mi { get; set; }
        [Url]
        [MaxLength(255)]
        public string AvatarUrl { get; set; }
        [MaxLength(10)]
        public string Title { get; set; }

    }
}

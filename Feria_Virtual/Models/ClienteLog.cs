using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;


namespace Feria_Virtual.Models
{
    public class ClienteLog
    {
        [Key]
        public string Id { get; set; }
        public string Password { get; set; }
    }
}

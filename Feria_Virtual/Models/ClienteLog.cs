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
        public string id { get; set; }
        public string password { get; set; }
    }
}

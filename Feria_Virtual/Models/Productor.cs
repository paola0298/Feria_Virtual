using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Feria_Virtual.Models
{
    public class Productor
    {
        [Key]
        public string Identificacion { get; set; }
        public string Nombre { get; set; }
        public string Sinpe { get; set; }
        public string Telefono { get; set; }
        public DateTimeOffset FechaNacimiento { get; set; }
        public bool Afiliado { get; set; }

        #region Apellido
        public string Apellido1 { get; set; }
        public string Apellido2 { get; set; }
        #endregion
        
        #region Dirección
        public string Provincia { get; set; }
        public string Canton { get; set; }
        public string Distrito { get; set; }
        #endregion
    }
}

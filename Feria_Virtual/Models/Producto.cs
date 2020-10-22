using System.ComponentModel.DataAnnotations;

namespace Feria_Virtual.Models
{
    public class Producto
    {
        [Key]
        public int Id { get; set; }
        public string Nombre { get; set; }
        public int IdCategoria { get; set; }
        public string IdProductor { get; set; }
        public int Disponibilidad { get; set; }
        public double Precio { get; set; }
        public string ModoVenta { get; set; }
        public string Foto { get; set; }
    }
}
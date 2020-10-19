using System.ComponentModel.DataAnnotations;

namespace Feria_Virtual.Models
{
    public class Orden
    {
        [Key]
        public string ComprobanteSinpe { get; set; }
        public string IdCliente { get; set; }
        public string IdProductor { get; set; }
        public double Total { get; set; }
        public string DireccionEntrega { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;

namespace Feria_Virtual.Models
{
    public class Categoria
    {
        [Key]
        public int Id { get; set; }
        public string Nombre { get; set; }
    }
}
namespace Feria_Virtual.Models
{
    public class Detalle
    {
        public string IdOrden { get; set; }
        public string NombreProducto { get; set; }
        public int Cantidad { get; set; }
        public double PrecioUnitario { get; set; }
    }
}
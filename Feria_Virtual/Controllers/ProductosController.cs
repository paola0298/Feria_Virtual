using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Feria_Virtual.Models;
using Feria_Virtual.Helpers;
using System.Linq;
using System.Collections.Generic;

namespace Feria_Virtual.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController: ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetProductosAsync() {
            var productos = await JsonHandler.LoadFileAsync<Producto>(FilePath.Productos);

            return Ok(productos);
        }

        [HttpGet("productor/{productorId}")]
        public async Task<IActionResult> GetProductosAsync(string productorId) {
            
            var productores = await JsonHandler.LoadFileAsync<Productor>(FilePath.Productores);
            if (!productores.Any(p => p.Identificacion == productorId))
                return BadRequest();
            
            var productos = await JsonHandler.LoadFileAsync<Producto>(FilePath.Productos);

            var productosSel = productos.FindAll(p => p.IdProductor == productorId);

            return Ok(productosSel);
        }

        [HttpGet("{nombreProducto}")]
        public async Task<IActionResult> GetProductoAsync(string nombreProducto) {
            var productos = await JsonHandler.LoadFileAsync<Producto>(FilePath.Productos);

            // var producto = productos.FirstOrDefault(p => p.Id == id);
            var producto = productos.FirstOrDefault(p => p.Nombre == nombreProducto);

            if (producto == null)
                return NotFound();

            return Ok(producto);
        }

        [HttpPost]
        public async Task<IActionResult> AddProductoAsync(Producto producto) {
            // TODO VERIFICAR SI EL PRODUCTO YA ESTA EN LOS PRODUCTOS DEL PRODUCTOR ACTUAL
            if (producto == null || string.IsNullOrWhiteSpace(producto.IdProductor))
                return BadRequest();

            var productores = await JsonHandler.LoadFileAsync<Productor>(FilePath.Productores);
            if (!productores.Any(p => p.Identificacion == producto.IdProductor))
                return BadRequest();
            
            var productos = await JsonHandler.LoadFileAsync<Producto>(FilePath.Productos);

            if (productos.Any(p => p.Nombre == producto.Nombre))
                return Conflict();

            // producto.Id = productos.Count;
            productos.Add(producto);

            await JsonHandler.OvewriteFileAsync(FilePath.Productos, productos);

            return CreatedAtRoute("default", new { nombreProducto = producto.Nombre }, producto);
        }

        [HttpPut("{nombreProducto}")]
        public async Task<IActionResult> UpdateProductoAsync(string nombreProducto, Producto producto) {
            if (producto == null || producto.Nombre != nombreProducto)
                return BadRequest();

            var productos = await JsonHandler.LoadFileAsync<Producto>(FilePath.Productos);

            var old = productos.FirstOrDefault(p => p.Nombre == nombreProducto);

            if (old == null)
                return NotFound();

            productos.Remove(old);
            productos.Add(producto);

            await JsonHandler.OvewriteFileAsync(FilePath.Productos, productos);

            return NoContent();
        } 

        [HttpDelete("{nombreProducto}")]
        public async Task<IActionResult> DeleteProductoAsync(string nombreProducto) {
            var productos = await JsonHandler.LoadFileAsync<Producto>(FilePath.Productos);

            // var producto = productos.FirstOrDefault(p => p.Id == id);
            var producto = productos.FirstOrDefault(p => p.Nombre == nombreProducto);

            if (producto == null)
                return NotFound();

            productos.Remove(producto);

            await JsonHandler.OvewriteFileAsync(FilePath.Productos, productos);

            return Ok();
        }

    }
}
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
    public class ProductosController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetProductosAsync()
        {
            var productos = await JsonHandler.LoadFileAsync<Producto>(FilePath.Productos);

            return Ok(productos);
        }

        [HttpGet("productor/{productorId}")]
        public async Task<IActionResult> GetProductosAsync(string productorId)
        {

            var productores = await JsonHandler.LoadFileAsync<Productor>(FilePath.Productores);
            if (!productores.Any(p => p.Identificacion == productorId))
                return BadRequest();

            var productos = await JsonHandler.LoadFileAsync<Producto>(FilePath.Productos);

            var productosSel = productos.FindAll(p => p.IdProductor == productorId);

            return Ok(productosSel);
        }

        [HttpGet("{nombreProducto}/{productorId}")]
        public async Task<IActionResult> GetProductoAsync(string nombreProducto, string productorId)
        {
            var productos = await JsonHandler.LoadFileAsync<Producto>(FilePath.Productos);

            // var producto = productos.FirstOrDefault(p => p.Id == id);
            // var producto = productos.FirstOrDefault(p => p.Nombre == nombreProducto); //obtener el que le corresponde al productor
            var producto = productos.FirstOrDefault(p =>
            {
                return p.Nombre == nombreProducto && p.IdProductor == productorId;
            });

            if (producto == null)
                return NotFound();

            return Ok(producto);
        }

        [HttpPost]
        public async Task<IActionResult> AddProductoAsync(Producto producto)
        {
            if (producto == null || string.IsNullOrWhiteSpace(producto.IdProductor))
                return BadRequest();

            var productores = await JsonHandler.LoadFileAsync<Productor>(FilePath.Productores);
            if (!productores.Any(p => p.Identificacion == producto.IdProductor))
                return BadRequest();

            var productos = await JsonHandler.LoadFileAsync<Producto>(FilePath.Productos);

            if (productos.Any(p => p.Nombre == producto.Nombre) && productos.Any(p => p.IdProductor == producto.IdProductor))
                return Conflict();

            producto.Foto = await UploadHelper.SaveUpload(producto.Foto, $"{producto.IdProductor}-{producto.Nombre}");

            productos.Add(producto);

            await JsonHandler.OvewriteFileAsync(FilePath.Productos, productos);

            return CreatedAtRoute("default", new { nombreProducto = producto.Nombre }, producto);
        }

        [HttpPut("{nombreProducto}/{productorId}/{photoUpdate?}")]
        public async Task<IActionResult> UpdateProductoAsync(string nombreProducto, string productorId, Producto producto, bool? photoUpdate)
        {
            if (producto == null || producto.Nombre != nombreProducto)
                return BadRequest();

            var productos = await JsonHandler.LoadFileAsync<Producto>(FilePath.Productos);

            // var old = productos.FirstOrDefault(p => p.Nombre == nombreProducto);
            var old = productos.FirstOrDefault(p =>
            {
                return p.Nombre == nombreProducto && p.IdProductor == productorId;
            });

            if (old == null)
                return NotFound();

            productos.Remove(old);

            if (photoUpdate != null && photoUpdate == true)
            {
                producto.Foto = await UploadHelper.SaveUpload(producto.Foto, $"{productorId}-{nombreProducto}");
            }

            productos.Add(producto);

            await JsonHandler.OvewriteFileAsync(FilePath.Productos, productos);

            return NoContent();
        }

        [HttpDelete("{nombreProducto}/{productorId}")]
        public async Task<IActionResult> DeleteProductoAsync(string nombreProducto, string productorId)
        {
            var productos = await JsonHandler.LoadFileAsync<Producto>(FilePath.Productos);

            // var producto = productos.FirstOrDefault(p => p.Id == id);
            // var producto = productos.FirstOrDefault(p => p.Nombre == nombreProducto);
            var producto = productos.FirstOrDefault(p =>
            {
                return p.Nombre == nombreProducto && p.IdProductor == productorId;
            });

            if (producto == null)
                return NotFound();

            productos.Remove(producto);

            await JsonHandler.OvewriteFileAsync(FilePath.Productos, productos);

            return Ok();
        }

    }
}
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Feria_Virtual.Models;
using Feria_Virtual.Helpers;
using System.Linq;
using System.Collections.Generic;
using System;

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

        [HttpGet("{idProducto}")]
        public async Task<IActionResult> GetProductoAsync(int idProducto)
        {
            var productos = await JsonHandler.LoadFileAsync<Producto>(FilePath.Productos);

            // var producto = productos.FirstOrDefault(p => p.Id == id);
            // var producto = productos.FirstOrDefault(p => p.Nombre == nombreProducto); //obtener el que le corresponde al productor
            var producto = productos.FirstOrDefault(p => p.Id == idProducto);

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

            // if (productos.Any(p => p.Nombre == producto.Nombre) && productos.Any(p => p.IdProductor == producto.IdProductor))
            //     return Conflict();

            var exists = productos.Any(p => p.IdProductor == producto.IdProductor && p.Nombre == producto.Nombre);

            if (exists)
                return Conflict();

            producto.Id = Math.Abs((producto.IdProductor + producto.Nombre).GetHashCode());
            producto.Foto = await UploadHelper.SaveUpload(producto.Foto, $"{producto.IdProductor}-{producto.Nombre}");

            productos.Add(producto);

            await JsonHandler.OvewriteFileAsync(FilePath.Productos, productos);

            return CreatedAtRoute("default", new { nombreProducto = producto.Nombre }, producto);
        }

        [HttpPut("{idProducto}/{photoUpdate?}")]
        public async Task<IActionResult> UpdateProductoAsync(int idProducto, bool? photoUpdate, Producto producto)
        {
            if (producto == null || producto.Id != idProducto)
                return BadRequest();

            var productos = await JsonHandler.LoadFileAsync<Producto>(FilePath.Productos);

            // var old = productos.FirstOrDefault(p => p.Nombre == nombreProducto);
            var old = productos.FirstOrDefault(p => p.Id == idProducto);

            if (old == null)
                return NotFound();

            productos.Remove(old);

            if (photoUpdate != null && photoUpdate == true)
            {
                var nombre = $"{producto.IdProductor}-{producto.Nombre}";
                producto.Foto = await UploadHelper.SaveUpload(producto.Foto, nombre);
            }

            productos.Add(producto);

            await JsonHandler.OvewriteFileAsync(FilePath.Productos, productos);

            return NoContent();
        }

        [HttpDelete("{idProducto}")]
        public async Task<IActionResult> DeleteProductoAsync(int idProducto)
        {
            var productos = await JsonHandler.LoadFileAsync<Producto>(FilePath.Productos);

            // var producto = productos.FirstOrDefault(p => p.Id == id);
            // var producto = productos.FirstOrDefault(p => p.Nombre == nombreProducto);
            var producto = productos.FirstOrDefault(p => p.Id == idProducto);

            if (producto == null)
                return NotFound();

            productos.Remove(producto);

            await JsonHandler.OvewriteFileAsync(FilePath.Productos, productos);

            return Ok();
        }

    }
}
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Feria_Virtual.Helpers;
using Feria_Virtual.Models;
using Microsoft.AspNetCore.Mvc;

namespace Feria_Virtual.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarritoController: ControllerBase
    {
        [HttpGet("{idCliente}")]
        public async Task<IActionResult> GetCarritoAsync(string idCliente) {
            //TODO: verificar que el cliente exista

            var productos = await JsonHandler.LoadFileAsync<ProductoCarrito>(FilePath.ProductosCarrito)
                .ConfigureAwait(false);

            return Ok(productos.FindAll(p => p.IdCliente == idCliente));
        }

        [HttpPost("{idCliente}")]
        public async Task<IActionResult> AddACarritoAsync(string idCliente, ProductoCarrito producto) {
            //TODO: verificar que el cliente exista
            if (string.IsNullOrWhiteSpace(idCliente))
                return BadRequest();

            var productoExists = await JsonHandler.CheckIfExists(FilePath.ProductosCarrito, producto, (p1, p2) => 
            {
                return p1.IdCliente == p2.IdCliente && p1.IdProducto == p2.IdProducto;
            });

            if (productoExists)
                return Conflict();

            producto.IdCliente = idCliente;

            await JsonHandler.AddToFileAsync(FilePath.ProductosCarrito, producto);

            return CreatedAtRoute("default", new { id = producto.IdProducto }, producto);
        }

        [HttpPut("{idCliente}/{idProducto}")]
        public async Task<IActionResult> UpdateCarritoAsync(string idCliente, int idProducto, ProductoCarrito producto) {
            //TODO: verificar que el cliente exista
            
            if (string.IsNullOrWhiteSpace(idCliente))
                return BadRequest();

            var allProductos = await JsonHandler.LoadFileAsync<ProductoCarrito>(FilePath.ProductosCarrito)
                .ConfigureAwait(false);

            var oldProducto = allProductos.FirstOrDefault(p => p.IdCliente == idCliente && p.IdProducto == idProducto);
            if (oldProducto == null)
                return NotFound();

            allProductos.Remove(oldProducto);
            allProductos.Add(producto);

            await JsonHandler.OvewriteFileAsync(FilePath.ProductosCarrito, allProductos)    
                .ConfigureAwait(false);

            return NoContent();
        }

        [HttpDelete("{idCliente}/{idProducto}")]
        public async Task<IActionResult> DeleteDeCarritoAsync(string idCliente, int idProducto) {
            //TODO: verificar que el cliente exista

            var allProductos = await JsonHandler.LoadFileAsync<ProductoCarrito>(FilePath.ProductosCarrito)
                .ConfigureAwait(false);

            var producto = allProductos.FirstOrDefault(p => p.IdCliente == idCliente && p.IdProducto == idProducto);

            // var carrito = allProductos.FindAll(p => p.IdCliente == idCliente);

            // var producto = carrito.FirstOrDefault(p => p.IdProducto == idProducto);

            if (producto == null)
                return NotFound();

            allProductos.Remove(producto);
            // carrito.Remove(producto);

            await JsonHandler.OvewriteFileAsync(FilePath.ProductosCarrito, allProductos);

            return Ok();
        }
    }
}
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
    public class CarritoController : ControllerBase
    {
        [HttpGet("{idCliente}")]
        public async Task<IActionResult> GetCarritoAsync(string idCliente)
        {
            //TODO: verificar que el cliente exista
            var carrito = await JsonHandler.LoadFileAsync<Carrito>(FilePath.Carrito)
                .ConfigureAwait(false);

            return Ok(carrito.FindAll(p => p.IdCliente == idCliente));
        }

        [HttpPost("{idCliente}")]
        public async Task<IActionResult> AddCarritoAsync(string idCliente, Carrito carrito)
        {
            //TODO: verificar que el cliente exista
            if (string.IsNullOrWhiteSpace(idCliente))
                return BadRequest();

            var exists = await JsonHandler.CheckIfExists(FilePath.Carrito, carrito, (c1, c2) =>
            {
                return c1.IdCliente == c2.IdCliente && c1.NombreProducto == c2.NombreProducto;
            });

            if (exists)
                return Conflict();

            var productos = await JsonHandler.LoadFileAsync<Producto>(FilePath.Productos);
            var producto = productos.FirstOrDefault(p => p.Nombre == carrito.NombreProducto);

            if (producto == null || carrito.Cantidad > producto.Disponibilidad)
                return BadRequest();

            carrito.IdCliente = idCliente;

            await JsonHandler.AddToFileAsync(FilePath.Carrito, carrito);

            return CreatedAtRoute("default", new { nombreProducto = carrito.NombreProducto }, carrito);
        }

        [HttpPut("{idCliente}/{nombreProducto}")]
        public async Task<IActionResult> UpdateCarritoAsync(string idCliente, string nombreProducto, Carrito carrito)
        {
            //TODO: verificar que el cliente exista
            if (string.IsNullOrWhiteSpace(idCliente))
                return BadRequest();

            var allCarritos = await JsonHandler.LoadFileAsync<Carrito>(FilePath.Carrito)
                .ConfigureAwait(false);

            var oldCarrito = allCarritos.FirstOrDefault(c => c.IdCliente == idCliente && c.NombreProducto == nombreProducto);

            if (oldCarrito == null)
                return NotFound();

            allCarritos.Remove(oldCarrito);
            allCarritos.Add(carrito);

            await JsonHandler.OvewriteFileAsync(FilePath.Carrito, allCarritos)
                .ConfigureAwait(false);

            return NoContent();
        }

        [HttpDelete("{idCliente}/{nombreProducto}")]
        public async Task<IActionResult> DeleteCarritoAsync(string idCliente, string nombreProducto)
        {
            //TODO: verificar que el cliente exista
            var allCarritos = await JsonHandler.LoadFileAsync<Carrito>(FilePath.Carrito)
                .ConfigureAwait(false);

            var carrito = allCarritos.FirstOrDefault(c => c.IdCliente == idCliente && c.NombreProducto == nombreProducto);

            if (carrito == null)
                return NotFound();

            allCarritos.Remove(carrito);

            await JsonHandler.OvewriteFileAsync(FilePath.Carrito, allCarritos)
                .ConfigureAwait(false);

            return Ok();
        }
    }
}
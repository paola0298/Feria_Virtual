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
                return c1.IdCliente == c2.IdCliente && c1.IdProducto == c2.IdProducto;
            });

            if (exists)
                return Conflict();

            carrito.IdCliente = idCliente;

            await JsonHandler.AddToFileAsync(FilePath.Carrito, carrito);

            return CreatedAtRoute("default", new { id = carrito.IdProducto }, carrito);
        }

        [HttpPut("{idCliente}/{idProducto}")]
        public async Task<IActionResult> UpdateCarritoAsync(string idCliente, int idProducto, Carrito carrito)
        {
            //TODO: verificar que el cliente exista
            if (string.IsNullOrWhiteSpace(idCliente))
                return BadRequest();

            var allCarritos = await JsonHandler.LoadFileAsync<Carrito>(FilePath.Carrito)
                .ConfigureAwait(false);

            var oldCarrito = allCarritos.FirstOrDefault(c => c.IdCliente == idCliente && c.IdProducto == idProducto);

            if (oldCarrito == null)
                return NotFound();

            allCarritos.Remove(oldCarrito);
            allCarritos.Add(carrito);

            await JsonHandler.OvewriteFileAsync(FilePath.Carrito, allCarritos)
                .ConfigureAwait(false);

            return NoContent();
        }

        [HttpDelete("{idCliente}/{idProducto}")]
        public async Task<IActionResult> DeleteCarritoAsync(string idCliente, int idProducto)
        {
            //TODO: verificar que el cliente exista
            var allCarritos = await JsonHandler.LoadFileAsync<Carrito>(FilePath.Carrito)
                .ConfigureAwait(false);

            var carrito = allCarritos.FirstOrDefault(c => c.IdCliente == idCliente && c.IdProducto == idProducto);

            if (carrito == null)
                return NotFound();

            allCarritos.Remove(carrito);

            await JsonHandler.OvewriteFileAsync(FilePath.Carrito, allCarritos)
                .ConfigureAwait(false);

            return Ok();
        }
    }
}
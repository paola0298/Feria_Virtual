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

        [HttpGet("completo/{idCliente}")]
        public async Task<IActionResult> GetCarritoAllAsync(string idCliente)
        {
            var carrito = await JsonHandler.LoadFileAsync<Carrito>(FilePath.Carrito)
                .ConfigureAwait(false);
            var productos = await JsonHandler.LoadFileAsync<Producto>(FilePath.Productos)
                .ConfigureAwait(false);

            List<CarritoFullItem> items = new List<CarritoFullItem>();

            foreach (var car in carrito.FindAll(p => p.IdCliente == idCliente))
            {
                var producto = productos.FirstOrDefault(p => p.Id == car.IdProducto);

                if (producto == null)
                    continue;

                items.Add(new CarritoFullItem
                {
                    Nombre = producto.Nombre,
                    Foto = producto.Foto,
                    IdProducto = producto.Id,
                    Cantidad = car.Cantidad,
                    Precio = car.Cantidad * producto.Precio
                });
            }

            return Ok(items);
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

            var productos = await JsonHandler.LoadFileAsync<Producto>(FilePath.Productos);
            var producto = productos.FirstOrDefault(p => p.Id == carrito.IdProducto);

            if (producto == null || carrito.Cantidad > producto.Disponibilidad)
                return BadRequest();

            productos.Remove(producto);
            producto.Disponibilidad -= carrito.Cantidad;
            productos.Add(producto);

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
            var productos = await JsonHandler.LoadFileAsync<Producto>(FilePath.Productos)
                .ConfigureAwait(false);

            var oldCarrito = allCarritos.FirstOrDefault(c => c.IdCliente == idCliente && c.IdProducto == idProducto);

            if (oldCarrito == null)
                return NotFound();

            var producto = productos.FirstOrDefault(p => p.Id == carrito.IdProducto);

            if (producto == null)
                return BadRequest();

            allCarritos.Remove(oldCarrito);
            productos.Remove(producto);

            if (oldCarrito.Cantidad > carrito.Cantidad)
            {
                producto.Disponibilidad += oldCarrito.Cantidad - carrito.Cantidad;
            }
            else if (oldCarrito.Cantidad < carrito.Cantidad)
            {
                producto.Disponibilidad -= carrito.Cantidad - oldCarrito.Cantidad;
            }

            allCarritos.Add(carrito);
            productos.Add(producto);

            await JsonHandler.OvewriteFileAsync(FilePath.Carrito, allCarritos)
                .ConfigureAwait(false);
            await JsonHandler.OvewriteFileAsync(FilePath.Productos, productos)
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
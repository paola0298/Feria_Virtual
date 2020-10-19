using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using Feria_Virtual.Helpers;
using Feria_Virtual.Models;
using Microsoft.AspNetCore.Mvc;

namespace Feria_Virtual.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdenController : ControllerBase
    {
        [HttpGet("productor/{id}")]
        public async Task<IActionResult> GetOrdenesProductor(string idProductor)
        {
            var allOrdenes = await JsonHandler.LoadFileAsync<Orden>(FilePath.Orden);

            var ordenes = allOrdenes.FindAll(o => o.IdProductor == idProductor);

            return Ok(ordenes);
        }

        [HttpGet("{comprobante}")]
        public async Task<IActionResult> GetOrdenAsync(string comprobante)
        {
            var allOrdenes = await JsonHandler.LoadFileAsync<Orden>(FilePath.Orden);
            var allDetalles = await JsonHandler.LoadFileAsync<Detalle>(FilePath.Detalle);

            var orden = allOrdenes.FirstOrDefault(o => o.ComprobanteSinpe == comprobante);

            if (orden == null)
                return NotFound();

            var detalles = allDetalles.FindAll(d => d.IdOrden == comprobante);

            var ordenDetalle = new
            {
                comprobanteSinpe = orden.ComprobanteSinpe,
                productos = detalles.Select(s => new { s.IdProducto, s.PrecioUnitario, s.Cantidad })
            };

            return Ok(ordenDetalle);
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrdenAsync(InfoOrden info)
        {
            var clientes = await JsonHandler.LoadFileAsync<Cliente>(FilePath.Clientes);
            if (!clientes.Any(c => c.Identificacion == info.IdCliente))
                return BadRequest();

            var allProductos = await JsonHandler.LoadFileAsync<Producto>(FilePath.Productos);
            var allCarritos = await JsonHandler.LoadFileAsync<Carrito>(FilePath.Carrito);
            var allOrdenes = await JsonHandler.LoadFileAsync<Orden>(FilePath.Orden);
            var allDetalles = await JsonHandler.LoadFileAsync<Detalle>(FilePath.Detalle);

            var carritoCliente = allCarritos.FindAll(c => c.IdCliente == info.IdCliente);

            if (carritoCliente.Count == 0)
                return BadRequest();

            allCarritos.RemoveAll(p => p.IdCliente == info.IdCliente);

            var orden = new Orden
            {
                ComprobanteSinpe = GetComprobanteSinpe(8),
                IdCliente = info.IdCliente,
                DireccionEntrega = info.DireccionEntrega,
                
            };
            var detalles = new List<Detalle>();

            foreach (var carrito in carritoCliente)
            {
                var producto = allProductos.FirstOrDefault(p => p.Id == carrito.IdProducto);

                if (producto == null)
                    continue;

                orden.Total += producto.Precio * carrito.Cantidad;

                detalles.Add(new Detalle
                {
                    IdOrden = orden.ComprobanteSinpe,
                    IdProducto = carrito.IdProducto,
                    PrecioUnitario = producto.Precio,
                    Cantidad = carrito.Cantidad
                });

                if (string.IsNullOrWhiteSpace(orden.IdProductor))
                {
                    orden.IdProductor = producto.IdProductor;
                }
            }

            allOrdenes.Add(orden);
            allDetalles.AddRange(detalles);

            await JsonHandler.OvewriteFileAsync(FilePath.Carrito, allCarritos);
            await JsonHandler.OvewriteFileAsync(FilePath.Orden, allOrdenes);
            await JsonHandler.OvewriteFileAsync(FilePath.Detalle, allDetalles);

            var ordenDetalle = new
            {
                comprobanteSinpe = orden.ComprobanteSinpe,
                productos = detalles.Select(s => new { s.IdProducto, s.PrecioUnitario, s.Cantidad })
            };

            return CreatedAtRoute("default", new { orden.ComprobanteSinpe }, ordenDetalle);
        }

        private string GetComprobanteSinpe(int length)
        {
            StringBuilder comprobante = new StringBuilder();
            var rng = new RNGCryptoServiceProvider();
            var rnd = new byte[1];
            int n = 0;
            while (n < length)
            {
                rng.GetBytes(rnd);
                rnd[0] %= 64;
                if (rnd[0] < 62)
                {
                    n++;
                    comprobante.Append((byte)((rnd[0] <= 9 ? '0' : rnd[0] <= 35 ? 'A' - 10 : 'a' - 36) + rnd[0]));
                }
            }
            return comprobante.ToString();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Feria_Virtual.Helpers;
using Feria_Virtual.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Feria_Virtual.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoresController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetProductoresAsync()
        {
            var productores = await JsonHandler.LoadFileAsync<Productor>(FilePath.Productores)
                .ConfigureAwait(false);
            var calificaciones = await JsonHandler.LoadFileAsync<Calificacion>(FilePath.Calificacion)
                .ConfigureAwait(false);

            var afiliados = await CargarCalificaciones(productores.FindAll(p => p.Afiliado == true));

            return Ok(afiliados);
        }

        public async Task<List<Productor>> CargarCalificaciones(List<Productor> productores)
        {
            var allCalificaciones = await JsonHandler.LoadFileAsync<Calificacion>(FilePath.Calificacion);

            foreach (var productor in productores)
            {
                var calificaciones = allCalificaciones.FindAll(x => x.IdProductor == productor.Identificacion);
                var count = calificaciones.Count;

                if (count == 0)
                    continue;

                productor.Calificaciones = count;
                productor.Calificacion = calificaciones.Sum(c => c.Valor) / count;
            }

            return productores;
        }

        [HttpGet("{prov}/{can}/{dis}")]
        public async Task<IActionResult> GetProductoresInRegionAsync(string prov, string can, string dis)
        {
            var productores = await JsonHandler.LoadFileAsync<Productor>(FilePath.Productores);

            var inRegion = await CargarCalificaciones(productores.FindAll(
                p => p.Provincia == prov &&
                p.Canton == can &&
                p.Distrito == dis));

            return Ok(inRegion);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductorAsync(string id)
        {
            var productores = await JsonHandler.LoadFileAsync<Productor>(FilePath.Productores)
                .ConfigureAwait(false);

            var productor = productores.FirstOrDefault(p => p.Identificacion == id);

            if (productor == null)
                return NotFound();

            var allCalificaciones = await JsonHandler.LoadFileAsync<Calificacion>(FilePath.Calificacion);
            var calificaciones = allCalificaciones.FindAll(c => c.IdProductor == id);

            if (calificaciones.Count > 0) {
                productor.Calificaciones = calificaciones.Count;
                productor.Calificacion = calificaciones.Sum(c => c.Valor) / calificaciones.Count;
            }
            
            return Ok(productor);
        }

        [HttpPost]
        public async Task<IActionResult> AddProductorAsync(Productor productor)
        {
            if (productor == null || string.IsNullOrWhiteSpace(productor.Identificacion))
                return BadRequest();

            var exists = await JsonHandler.CheckIfExists(FilePath.Productores, productor, (p1, p2) =>
            {
                return p1.Identificacion == p2.Identificacion;
            });

            if (exists)
                return Conflict();

            //Los productores agregados desde la vista de administración están afiliados por defecto
            productor.Afiliado = true;
            productor.Password = Encryption.Encrypt(productor.Password);

            await JsonHandler.AddToFileAsync(FilePath.Productores, productor)
                .ConfigureAwait(false);

            //return CreatedAtRoute("GetProductor", productor);
            return CreatedAtRoute("default", new { id = productor.Identificacion }, productor);
        }

        [HttpPut("calificar")]
        public async Task<IActionResult> CalificarProductorAsync(CalificacionInfo calificacion)
        {
            if (string.IsNullOrWhiteSpace(calificacion.IdProductor) || string.IsNullOrWhiteSpace(calificacion.IdCliente))
                return BadRequest();

            var productores = await JsonHandler.LoadFileAsync<Productor>(FilePath.Productores);
            var clientes = await JsonHandler.LoadFileAsync<Cliente>(FilePath.Clientes);
            var ordenes = await JsonHandler.LoadFileAsync<Orden>(FilePath.Orden);
            var calificaciones = await JsonHandler.LoadFileAsync<Calificacion>(FilePath.Calificacion);

            if (!productores.Any(p => p.Identificacion == calificacion.IdProductor) ||
                !clientes.Any(c => c.Identificacion == calificacion.IdCliente))
                return BadRequest();

            if (calificacion.Calificacion < 1 || calificacion.Calificacion > 5)
                return BadRequest();

            //TODO: Verificar que el cliente tenga alguna compra realizada al productor a calificar
            var compraRealizada = ordenes.Any(
                o => o.IdCliente == calificacion.IdCliente
                && o.IdProductor == calificacion.IdProductor);

            var calificacionDada = calificaciones.Any(c => c.IdCliente == calificacion.IdCliente);

            //No calificar si no se ha comprado al productor o si ya se calificó
            if (!compraRealizada || calificacionDada)
                return BadRequest();

            var cal = new Calificacion
            {
                IdProductor = calificacion.IdProductor,
                IdCliente = calificacion.IdCliente,
                Valor = calificacion.Calificacion
            };

            calificaciones.Add(cal);

            await JsonHandler.OvewriteFileAsync(FilePath.Calificacion, calificaciones);

            return CreatedAtRoute("default", cal);
        }

        [HttpPut("{id}/{passUpdate?}")]
        public async Task<IActionResult> UpdateProductorAsync(string id, Productor newProductor, bool? passUpdate)
        {
            if (id != newProductor.Identificacion)
                return BadRequest();

            var productores = await JsonHandler.LoadFileAsync<Productor>(FilePath.Productores)
                .ConfigureAwait(false);

            var oldProductor = productores.FirstOrDefault(p => p.Identificacion == id);

            if (oldProductor == null)
                return BadRequest();

            productores.Remove(oldProductor);

            if (passUpdate != null && passUpdate == true)
            {
                newProductor.Password = Encryption.Encrypt(newProductor.Password);
            }

            productores.Add(newProductor);

            await JsonHandler.OvewriteFileAsync(FilePath.Productores, productores)
                .ConfigureAwait(false);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductorAsync(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                return BadRequest();

            var productores = await JsonHandler.LoadFileAsync<Productor>(FilePath.Productores)
                .ConfigureAwait(false);

            var toDelete = productores.FirstOrDefault(p => p.Identificacion == id);

            if (toDelete == null)
                return NotFound();

            productores.Remove(toDelete);

            await JsonHandler.OvewriteFileAsync(FilePath.Productores, productores);

            return Ok();
        }
    }
}

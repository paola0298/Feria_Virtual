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
    public class AfiliacionesController: ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAfiliacionesAsync() {
            var afiliaciones = await JsonHandler.LoadFileAsync<Afiliacion>(FilePath.Afiliaciones)
                .ConfigureAwait(false);

            var afiliacionesPendientes = afiliaciones.FindAll(a => a.Estado == AfiliacionStatus.Pendiente);

            return Ok(afiliacionesPendientes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAfiliacionAsync(int id) {
            var afiliaciones = await JsonHandler.LoadFileAsync<Afiliacion>(FilePath.Afiliaciones)
                .ConfigureAwait(false);
            
            var afiliacion = afiliaciones.FirstOrDefault(a => a.Id == id);

            if (afiliacion == null)
                return NotFound();

            return Ok(afiliacion);
        }

        [HttpPost]
        public async Task<IActionResult> AddAfiliacionAsync(Productor productor) {
            
            if (productor == null || string.IsNullOrWhiteSpace(productor.Identificacion))
                return BadRequest();

            var productorExists = await JsonHandler.CheckIfExists<Productor>(FilePath.Productores, productor, (p1, p2) => 
            {
                return p1.Identificacion == p2.Identificacion;
            });

            if (productorExists)
                return Conflict();
            
            var afiliaciones = await JsonHandler.LoadFileAsync<Afiliacion>(FilePath.Afiliaciones);
            
            var afiliacion = new Afiliacion() {
                Id = afiliaciones.Count,
                Estado = AfiliacionStatus.Pendiente,
                Productor = productor
            };

            afiliaciones.Add(afiliacion);
            
            await JsonHandler.OvewriteFileAsync<Afiliacion>(FilePath.Afiliaciones, afiliaciones);

            return CreatedAtRoute("default", new { id = afiliacion.Id }, afiliacion);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAfiliacionAsync(int id, Afiliacion afiliacion) {
            if (afiliacion == null || id != afiliacion.Id) 
                return BadRequest();
            
            var afiliaciones = await JsonHandler.LoadFileAsync<Afiliacion>(FilePath.Afiliaciones)
                .ConfigureAwait(false);
            
            var old = afiliaciones.FirstOrDefault(a => a.Id == id);

            if (old == null)
                return NotFound();
            
            afiliaciones.Remove(old);

            if (afiliacion.Estado == AfiliacionStatus.Aceptada) {
                await JsonHandler.AddToFileAsync<Productor>(FilePath.Productores, afiliacion.Productor)
                    .ConfigureAwait(false);
            }

            afiliaciones.Add(afiliacion);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAfiliacionAsync(int id) {
            if (id < 0)
                return BadRequest();
            
            var afiliaciones = await JsonHandler.LoadFileAsync<Afiliacion>(FilePath.Afiliaciones)
                .ConfigureAwait(false);
            
            var afiliacion = afiliaciones.FirstOrDefault(a => a.Id == id);

            if (afiliacion == null)
                return NotFound();

            afiliaciones.Remove(afiliacion);

            return Ok();
        }
    }
}
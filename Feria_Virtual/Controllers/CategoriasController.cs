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
    public class CategoriasController: ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetCategoriasAsync() {
            var categorias = await JsonHandler.LoadFileAsync<Categoria>(FilePath.Categorias)
                .ConfigureAwait(false);

            return Ok(categorias);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoriaAsync(int id) {
            var categorias = await JsonHandler.LoadFileAsync<Categoria>(FilePath.Categorias)
                .ConfigureAwait(false);
            
            var cat = categorias.FirstOrDefault(c => c.Id == id);

            if (cat == null)
                return NotFound();

            return Ok(cat);
        }

        [HttpPost]
        public async Task<IActionResult> AddCategoriaAsync(Categoria categoria) {
            if (categoria == null || string.IsNullOrWhiteSpace(categoria.Nombre))
                return BadRequest();

            var exists = await JsonHandler.CheckIfExists(FilePath.Categorias, categoria, (c1, c2) =>
            {
                return c1.Nombre == c2.Nombre;
            });

            if (exists)
                return Conflict();

            var categorias = await JsonHandler.LoadFileAsync<Categoria>(FilePath.Categorias);

            //Id de categoría autoincrementable
            categoria.Id = categorias.Count;

            await JsonHandler.AddToFileAsync(FilePath.Categorias, categoria);

            return CreatedAtRoute("default", new { id = categoria.Id }, categoria);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategoriaAsync(int id, Categoria categoria) {
            if (categoria == null || id != categoria.Id) 
                return BadRequest();

            var categorias = await JsonHandler.LoadFileAsync<Categoria>(FilePath.Categorias)
                .ConfigureAwait(false);

            var oldCat = categorias.FirstOrDefault(c => c.Id == id);

            if (oldCat == null)
                return NotFound();

            categorias.Remove(oldCat);
            categorias.Add(categoria);

            await JsonHandler.OvewriteFileAsync(FilePath.Categorias, categorias);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategoriaAsync(int id) {
            var categorias = await JsonHandler.LoadFileAsync<Categoria>(FilePath.Categorias)
                .ConfigureAwait(false);

            var cat = categorias.FirstOrDefault(c => c.Id == id);

            if (cat == null)
                return NotFound();

            categorias.Remove(cat);

            await JsonHandler.OvewriteFileAsync(FilePath.Categorias, categorias);

            return Ok();
        }
    }
}
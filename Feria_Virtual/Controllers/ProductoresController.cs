﻿using System;
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
            return Ok(productores);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductorAsync(string id)
        {
            var productores = await JsonHandler.LoadFileAsync<Productor>(FilePath.Productores)
                .ConfigureAwait(false);

            var productor = productores.FirstOrDefault(p => p.Identificacion == id);

            if (productor == null)
                return NotFound();

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

            await JsonHandler.AddToFileAsync(FilePath.Productores, productor)
                .ConfigureAwait(false);

            //return CreatedAtRoute("GetProductor", productor);
            return CreatedAtRoute("default", new { id = productor.Identificacion }, productor);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProductorAsync(string id, Productor newProductor)
        {
            if (id != newProductor.Identificacion)
                return BadRequest();

            var productores = await JsonHandler.LoadFileAsync<Productor>(FilePath.Productores)
                .ConfigureAwait(false);

            var oldProductor = productores.FirstOrDefault(p => p.Identificacion == id);

            if (oldProductor == null)
                return BadRequest();

            productores.Remove(oldProductor);
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

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Feria_Virtual.Helpers;
using Feria_Virtual.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace Feria_Virtual.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class ClientesController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetClientesAsync()
        {
            var clientes = await JsonHandler.LoadFileAsync<Cliente>(FilePath.Clientes)
                .ConfigureAwait(false);
            return Ok(clientes);
        }

        public string encrypt(string text){
           MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();
           md5.ComputeHash(ASCIIEncoding.ASCII.GetBytes(text));
           byte[] result = md5.Hash;
           StringBuilder str = new StringBuilder();
           for(int i=1;i<result.Length;i++){
               str.Append(result[i].ToString("x2"));
           }
           return str.ToString();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetClienteAsync(string id)
        {
            var clientes = await JsonHandler.LoadFileAsync<Cliente>(FilePath.Clientes)
                .ConfigureAwait(false);

            var cliente = clientes.FirstOrDefault(p => p.Identificacion == id);

            if (cliente == null)
                return NotFound();

            return Ok(cliente);
        }


        [HttpPost]
        public async Task<IActionResult> AddClienteAsync(Cliente cliente)
        {
            cliente.Password = encrypt(cliente.Password);

            if (cliente == null || string.IsNullOrWhiteSpace(cliente.Identificacion))
                return BadRequest();

            var exists = await JsonHandler.CheckIfExists(FilePath.Clientes, cliente, (p1, p2) =>
            {
                return p1.Identificacion == p2.Identificacion;
            });

            if (exists)
                return Conflict();

            await JsonHandler.AddToFileAsync(FilePath.Clientes, cliente)
                .ConfigureAwait(false);

            return CreatedAtRoute("default", new { id = cliente.Identificacion }, cliente);
            


        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClienteAsync(string id, Cliente newCliente)
        {
            if (id != newCliente.Identificacion)
                return BadRequest();

            var cliente = await JsonHandler.LoadFileAsync<Cliente>(FilePath.Clientes)
                .ConfigureAwait(false);

            var oldCliente = cliente.FirstOrDefault(p => p.Identificacion == id);

            if (oldCliente == null)
                return BadRequest();

            cliente.Remove(oldCliente);
            cliente.Add(newCliente);

            await JsonHandler.OvewriteFileAsync(FilePath.Clientes, cliente)
                .ConfigureAwait(false);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClienteAsync(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                return BadRequest();

            var clientes = await JsonHandler.LoadFileAsync<Cliente>(FilePath.Clientes)
                .ConfigureAwait(false);

            var toDelete = clientes.FirstOrDefault(p => p.Identificacion == id);

            if (toDelete == null)
                return NotFound();

            clientes.Remove(toDelete);

            await JsonHandler.OvewriteFileAsync(FilePath.Clientes, clientes);

            return Ok(clientes);
        }

        
    }
}

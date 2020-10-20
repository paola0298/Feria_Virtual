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

    public class ClienteLogController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> ClienteLogAsync(ClienteLog log)
        {
            if (log == null || string.IsNullOrWhiteSpace(log.Id) || string.IsNullOrWhiteSpace(log.Password))
                return BadRequest();

            var clientes = await JsonHandler.LoadFileAsync<Cliente>(FilePath.Clientes)
                .ConfigureAwait(false);
            var productores = await JsonHandler.LoadFileAsync<Productor>(FilePath.Productores)
                .ConfigureAwait(false);

            var cliente = clientes.FirstOrDefault(p => p.Usuario == log.Id);

            //Usuario incorrecto
            if (cliente == null)
            {
                var productor = productores.FirstOrDefault(p => p.Identificacion == log.Id);

                if (productor == null)
                    return BadRequest();

                if (!productor.Afiliado)
                    return Forbid();

                //Usar productor;
                if (!Encryption.Equals(log.Password, productor.Password))
                    return BadRequest();

                //Mandar datos de productor.
                return Ok(new
                {
                    id = productor.Identificacion,
                    client = false
                });
            }

            if (!Encryption.Equals(log.Password, cliente.Password))
                return BadRequest();

            return Ok(new
            {
                id = cliente.Identificacion,
                client = true
            });
        }
    }
}

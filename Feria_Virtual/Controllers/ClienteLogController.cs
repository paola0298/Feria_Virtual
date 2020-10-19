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
        public string EncryptLogin(string text)
        {
            MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();
            md5.ComputeHash(ASCIIEncoding.ASCII.GetBytes(text));
            byte[] result = md5.Hash;
            StringBuilder str = new StringBuilder();
            for (int i = 1; i < result.Length; i++)
            {
                str.Append(result[i].ToString("x2"));
            }
            return str.ToString();
        }

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

                //Usar productor;
                if (!productor.Password.Equals(EncryptLogin(log.Password)))
                    return BadRequest();

                //Mandar datos de productor.
                return Ok(new
                {
                    id = productor.Identificacion,
                    client = false
                });
            }

            if (!cliente.Password.Equals(EncryptLogin(log.Password)))
                return BadRequest();

            return Ok(new
            {
                id = cliente.Identificacion,
                client = true
            });
        }
    }
}

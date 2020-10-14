using System;
using System.ComponentModel.DataAnnotations;
using Feria_Virtual.Models;

namespace Feria_Virtual.Models {

    public enum AfiliacionStatus {
        Pendiente = 0,
        Aceptada = 1,
        Denegada = 2
    }

    public class Afiliacion {
        [Key]
        public int Id { get; set; }
        public AfiliacionStatus Estado { get; set; }
        public string IdProductor { get; set; }
    }
}
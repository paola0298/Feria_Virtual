import { Component, OnInit } from '@angular/core';
import { provinces, cantonSJ, cantonAlaj, cantonCart, cantonGua, cantonHere, cantonLim, cantonPunt, distrSJ } from '../directions';

@Component({
  selector: 'app-producer',
  templateUrl: './producer.component.html',
  styleUrls: ['./producer.component.css']
})
export class ProducerComponent implements OnInit {
  provinces = provinces;
  cantonSJ = cantonSJ;
  cantonAlaj = cantonAlaj;
  cantonHere = cantonHere;
  cantonCart = cantonCart;
  cantonGua = cantonGua;
  cantonPunt = cantonPunt;
  cantonLim = cantonLim;
  distrSJ = distrSJ;
  cantons = [];
  districts = [];
  producers = [
    {
    id: 402390083,
    name: 'Paola',
    lastName: 'Villegas',
    lastName2: 'Chacon',
    sinpe: 123456789,
    phone: 83216963,
    birth: '02-06-1998',
    province: 'Heredia',
    canton: 'Heredia',
    district: 'Vara Blanca',
    dir: 'Minisuper Vara Blanca',
    deliver: 'Heredia'
    }
  ];

  constructor() { }
  ngOnInit(): void {
    $("td").on('contextmenu', function (e) {
      $('td').css('box-shadow', 'none');
      var top = e.pageY - 10;
      var left = e.pageX - 120;
      $(this).css('box-shadow', 'inset 1px 1px 0px 0px red, inset -1px -1px 0px 0px red');
      $("#menu").css({
        display: "block",
        top: top,
        left: left
      });
      return false; //blocks default Webbrowser right click menu

    });

    $("body").on("click", function () {
      if ($("#menu").css('display') == 'block') {
        $(" #menu ").hide();
      }
      $('td').css('box-shadow', 'none');
    });

    $("#menu a").on("click", function () {
      $(this).parent().hide();
    });

  }

  /**
   * Metodo para agregar los cantones correspondientes a una provincia
   * @param province Provincia seleccionada
   */
  loadCanton(province: string): void {

    document.getElementById("provinceDDM").textContent = province;

    switch (province) {
      case this.provinces[0]:
        this.cantons = this.cantonSJ;
        break;
      case this.provinces[1]:
        this.cantons = this.cantonAlaj;
        break;
      case this.provinces[2]:
        this.cantons = this.cantonHere;
        break;
      case this.provinces[3]:
        this.cantons = this.cantonCart;
        break;
      case this.provinces[4]:
        this.cantons = this.cantonGua;
        break;
      case this.provinces[5]:
        this.cantons = this.cantonPunt;
        break;
      case this.provinces[6]:
        this.cantons = this.cantonLim;
        break;
    }
  }

  /**
   * Metodo para agregar los distritos correspondientes a un canton
   * @param canton Canton seleccionado
   */
  loadDistrict(canton: string): void {
    document.getElementById("cantonDDM").textContent = canton;
    if (canton == 'San Jose') {
      this.districts = distrSJ;
    }
  }

  /**
   * Metodo para colocar el distrito seleccionado en el nombre del dropdown 
   * @param district
   */
  setActualDistrict(district: string): void {
    document.getElementById("districtDDM").textContent = district;
  }

  /**
   * Metodo para almacenar el nuevo productor
   */
  saveProducer(): void {
    let id = (document.getElementById("id") as HTMLInputElement).value;
    let name = (document.getElementById("name") as HTMLInputElement).value;
    let lastName1 = (document.getElementById("last-name1") as HTMLInputElement).value;
    let lastName2 = (document.getElementById("last-name2") as HTMLInputElement).value;
    let sinpe = (document.getElementById("sinpe") as HTMLInputElement).value;
    let phone = (document.getElementById("phone") as HTMLInputElement).value;
    let birth = (document.getElementById("birth") as HTMLInputElement).value;
    let province = document.getElementById("provinceDDM").textContent;
    let canton = document.getElementById("cantonDDM").textContent;
    let district = document.getElementById("districtDDM").textContent;
    let dir = (document.getElementById("dir") as HTMLInputElement).value;
    let deliver = (document.getElementById("deliver") as HTMLInputElement).value;
    console.log('id:' + id + '\n' + 'name:' + name + '\n' + 'lastName1:' + lastName1 + '\n' +
      'lastName2:' + lastName2 + '\n' + 'sinpe:' + sinpe + '\n' + 'phone:' + phone + '\n' +
      'birth:' + birth + '\n' + 'province:' + province + '\n' + 'canton:' + canton + '\n' +
      'district:' + district + '\n' + 'dir:' + dir + '\n' + 'deliver:' + deliver);

    // TODO verificar que se haya ingresado alguna provincia, canton y distrito
    if (id == '' || name == '' || lastName1 == '' || lastName2 == '' || sinpe == '' || phone == '' || birth == '' ||
      dir == '' || deliver == '') {
      $('#saveMsj').modal('show');
      document.getElementById("saveMsjLabel").textContent = "Error al guardar el nuevo productor";
      document.getElementById("msjText").textContent = "Por favor complete todos los campos.";
    } else {
      // TODO guardar productor
      $('#saveMsj').modal('show');
      document.getElementById("saveMsjLabel").textContent = "Exito";
      document.getElementById("msjText").textContent = "Nuevo productor guardado correctamente.";
      // TODO actualizar la tabla de productores
    }

  }

  updateProducer(id: string): void {
    console.log("Updating producer: " + id);
  }

  deleteProducer(id: string): void {
    console.log("Deleting producer: " + id);
  }
}

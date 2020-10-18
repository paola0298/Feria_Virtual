import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service' 

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  constructor(private utilsService:UtilsService) { }

  ngOnInit() { }

  login() {
    let adminCode = (document.getElementById("adminCode") as HTMLInputElement);

    if (adminCode.value == "") {
      this.utilsService.showInfoModal("Error", "Por favor ingrese el código de administrador", "saveMsjLabel", "msjText", "saveMsj");
      return;
    } 

    if (Number(adminCode.value) == 12345) {
      //cargar pagina
      (document.getElementById("adminCode") as HTMLInputElement).value = "";
    }
  }

  closeModal(modal:string) {
    document.getElementById(modal).style.setProperty('display', 'none');
  }

}

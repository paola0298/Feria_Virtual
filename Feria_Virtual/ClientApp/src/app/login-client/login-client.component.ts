import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service'

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.css']
})
export class LoginClientComponent implements OnInit {

  utilsService:UtilsService = new UtilsService();
  constructor() { }

  ngOnInit() { }

  login() {
    let username = (document.getElementById("username") as HTMLInputElement);
    let pass = (document.getElementById("password") as HTMLInputElement);

    console.log("Username: " + username.value + " Password: " + pass.value);

    // TODO verificar que este registrado el usuario
    if (username.value == "" || pass.value == "") {
      this.utilsService.showInfoModal("Error", "Por favor complete todos los campos", "saveMsjLabel", "msjText", "saveMsj");
    } else {
      //cargar pagina
    }
  }

  closeModal(modal:string) {
    document.getElementById(modal).style.setProperty('display', 'none');
  }

}

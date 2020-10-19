import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service'
import { RestclientService } from 'src/app/services/restclient.service'
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.css']
})
export class LoginClientComponent implements OnInit {

  
  constructor(private utilsService:UtilsService, private restClientService: RestclientService,
    private router: Router) { }

  ngOnInit() { }

  checkLogin(id:string, pass:string) {
    var response = this.restClientService.loginClient(id, pass);
    response.subscribe(
      (value:any) => {
        //cargar pagina
        var userId = value.id;
        var client:boolean = value.client;

        console.log(userId + " " + client);

        if (client) {
          window.localStorage.setItem("userId", userId);
          this.router.navigate(['menu-client']);
        } else {
          this.utilsService.showInfoModal("Error", "Error al iniciar sesion, el cliente no esta registrado", "saveMsjLabel", "msjText", 'saveMsj');
        }
      }, (error:any) => {
        console.log(error.statusText);
        console.log(error.status);
        this.utilsService.showInfoModal("Error", "Error al iniciar sesion", "saveMsjLabel", "msjText", 'saveMsj');
      });
  }

  login() {
    let username = (document.getElementById("username") as HTMLInputElement);
    let pass = (document.getElementById("password") as HTMLInputElement);

    console.log("Username: " + username.value + " Password: " + pass.value);
    // TODO verificar que este registrado el usuario
    if (username.value == "" || pass.value == "") {
      this.utilsService.showInfoModal("Error", "Por favor complete todos los campos", "saveMsjLabel", "msjText", "saveMsj");
    } else {
      this.checkLogin(username.value, pass.value);
    }
  }

  closeModal(modal:string) {
    document.getElementById(modal).style.setProperty('display', 'none');
  }

}

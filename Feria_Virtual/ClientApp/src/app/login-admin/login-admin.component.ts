import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})


export class LoginAdminComponent implements OnInit {

  constructor(private utilsService:UtilsService, private router: Router) { }

  ngOnInit() { }

  login() {
    let adminCode = (document.getElementById("adminCode") as HTMLInputElement);

    if (adminCode.value == "") {
      this.utilsService.showInfoModal("Error", "Por favor ingrese el código de administrador", "saveMsjLabel", "msjText", "saveMsj");
      return;
    } 

    if (Number(adminCode.value) == 12345) {
      //cargar pagina
      console.log('Code is valid!');
      (document.getElementById("adminCode") as HTMLInputElement).value = "";
      this.router.navigate(['menu-admin'] );
    }
  }

  closeModal(modal:string) {
    document.getElementById(modal).style.setProperty('display', 'none');
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public user:string = '';
  public password:string = '';

  constructor(private loginService: LoginService, private route: Router) { }

  ngOnInit(): void {
  }

  public Login(): void{
    let infoUser = {
      "email": this.user,
      "password": this.password,
      "returnSecureToken": true
    };
    this.loginService.Login(infoUser).subscribe((response)=>{
      //Las credenciales son las correctas
      this.loginService.token = response.idToken;
      localStorage.setItem('token', response.idToken)
      this.ResetValues();
      this.route.navigateByUrl('/clientes');
    }, err=>{
      Swal.fire({
        icon: 'error',
        title: 'Credenciales no validas ',
        text: 'Verifique su usuario y contraseña'
      });
      this.ResetValues();
    })
  }

  private ResetValues(): void{
    this.user = '';
    this.password = '';
  }

}

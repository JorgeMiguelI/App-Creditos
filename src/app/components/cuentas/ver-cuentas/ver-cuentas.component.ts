import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CuentasService } from 'src/app/services/cuentas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-cuentas',
  templateUrl: './ver-cuentas.component.html',
  styleUrls: ['./ver-cuentas.component.scss']
})
export class VerCuentasComponent implements OnInit {

  public idCliente: number;
  public ListaMisCuentas: any[];
  constructor(private rutaActiva: ActivatedRoute, private cuentaService: CuentasService, private route: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null){
      this.idCliente = this.rutaActiva.snapshot.params.idCliente;
      localStorage.setItem('cliente', this.idCliente.toString());
      console.log(this.idCliente)
      this.ObtenerCuentas();
    }else{
      this.route.navigateByUrl('/');
    }
    
  }

  ObtenerCuentas(){
    this.cuentaService.ObtenerCuentas().subscribe((result)=>{
      let cuentas = Object.entries(result).map(i => i[1]);
      let listaCuentas: any[] = cuentas;
      this.ListaMisCuentas = listaCuentas.filter(cuenta =>{
        if(cuenta.idCliente == this.idCliente){
          return cuenta;
        }
      })
      console.log(this.ListaMisCuentas);
    }, err=>{
      if(err.statusText == 'Unauthorized'){
        Swal.fire({
          icon: 'error',
          title: 'Su sesión a expirado',
          text: 'Vuelva a iniciar sesión para seguir operando el sistema'
        })
       this.route.navigateByUrl('/');
       localStorage.clear();
      }
    })
  }

  Depositar(cuenta){
    localStorage.setItem('cuenta', JSON.stringify(cuenta));
    this.route.navigateByUrl(`/cuentas/depositos/${cuenta.numeroCuenta}`);
  }

  Retirar(cuenta){
    localStorage.setItem('cuenta', JSON.stringify(cuenta));
    this.route.navigateByUrl(`/cuentas/retiros/${cuenta.numeroCuenta}`);
  }

  verMovimientos(noCuenta){
    this.route.navigateByUrl(`/cuentas/consultas/${noCuenta}`);
  }

}

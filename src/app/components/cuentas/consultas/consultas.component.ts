import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CuentasService } from 'src/app/services/cuentas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss']
})
export class ConsultasComponent implements OnInit {

  public ListadoMovimientos: any[];
  public noCuenta:string;
  public fechaMovimiento = '';
  public hayMovimientos: boolean;
  constructor(private cuentaService: CuentasService, private rutaActiva: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null){
      this.noCuenta = this.rutaActiva.snapshot.params.cuenta;
      this.consultarMovimientos();
    }else{
      this.route.navigateByUrl('/');
    }
    
  }

  consultarMovimientos(){
    this.cuentaService.VerMovimientos().subscribe((result)=>{
      let movi = Object.entries(result).map(i => i[1]);
      let listaTemp: any[] = movi;
      this.ListadoMovimientos = listaTemp.filter(movimiento =>{
        if(movimiento.numeroCuenta == this.noCuenta){
          return movimiento;
        }
      });
      if(this.ListadoMovimientos.length > 0){
        this.hayMovimientos = true;
      }else{
        this.hayMovimientos = false;
      }
      console.log(this.ListadoMovimientos);
    }, err=>{
      if(err.statusText == 'Unauthorized'){
        Swal.fire({
          icon: 'error',
          title: 'Su sesión a expirado',
          text: 'Vuelva a iniciar sesión para seguir operando el sistema'
        })
       this.route.navigateByUrl('/');
       localStorage.clear();
      }else{
        Swal.fire({
          icon: 'error',
          title: 'No se pudo cargar la información',
          text: 'Verifique su conexión con el servidor y la Base de Datos'
        });
      }
    })
  }

}

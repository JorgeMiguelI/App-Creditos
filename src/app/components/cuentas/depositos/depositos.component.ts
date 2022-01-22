import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CuentasService } from 'src/app/services/cuentas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-depositos',
  templateUrl: './depositos.component.html',
  styleUrls: ['./depositos.component.scss']
})
export class DepositosComponent implements OnInit {

  public noCuenta: string;
  public formularioDeposito: FormGroup;
  public Cuenta: any
  constructor(private rutaActiva: ActivatedRoute, private fb: FormBuilder, private cuentaService: CuentasService, private route: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null){
      this.noCuenta = this.rutaActiva.snapshot.params.cuenta;
      this.Cuenta = JSON.parse(localStorage.getItem('cuenta'));
      this.formularioDeposito = this.fb.group({
        deposito: ['', Validators.required],
      });
    }else{
      this.route.navigateByUrl('/');
    }
    
  }

  Depositar(){
    let deposito = {
      fechaUltimaAct: this.getFechaActual(),
      monto: this.formularioDeposito.value.deposito,
      numeroCuenta: this.noCuenta,
      terminal: 'TERM235',
      tipo: 'Deposito',
      usuario: 'u-231'
    }
    this.cuentaService.DepositoCuenta(deposito).subscribe((res)=>{
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Deposito Registrado!',
        text: 'El deposito ha sido registrado correctamente'
      });
      this.formularioDeposito.reset();
    }, err =>{
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
          title: 'No se pudo hacer el deposito',
          text: 'Verifique su conexión con el servidor y la Base de Datos'
        });
      }
      
    })
    this.formularioDeposito.reset();
  }

  Cancelar(){
    this.route.navigateByUrl(`/cuentas/ver-cuentas/${localStorage.getItem('cliente')}`)
  }

  private getFechaActual(): string{
    let fechaActual = new Date();
    let dia = fechaActual.getDate();
    let d = dia.toString();
    if(dia < 10){
      d = '0'+d;
    }
    let mes = fechaActual.getMonth()+1;
    let m = mes.toString();
    if(mes < 10){
      m = "0"+m;
    }
    let anio = fechaActual.getFullYear();
    let hora = fechaActual.getHours();
    let minutos = fechaActual.getMinutes();
    let min = minutos.toString();
    if(minutos <10){
      min = '0'+min;
    }
    let seg = fechaActual.getSeconds();
    let s = seg.toString();
    if(seg < 10){
      s = '0'+ s;
    }
    return anio+"-"+m+"-"+d+" "+hora+':'+min+':'+s;
  }

}

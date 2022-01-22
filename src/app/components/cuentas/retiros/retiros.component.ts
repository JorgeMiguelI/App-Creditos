import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CuentasService } from 'src/app/services/cuentas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-retiros',
  templateUrl: './retiros.component.html',
  styleUrls: ['./retiros.component.scss']
})
export class RetirosComponent implements OnInit {

  public noCuenta: string;
  public formularioRetiro: FormGroup;
  public Cuenta:any;
  public cantidadValida: boolean = true;
  constructor(private rutaActiva: ActivatedRoute, private fb: FormBuilder, private cuentaService: CuentasService, private route:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null){
      this.noCuenta = this.rutaActiva.snapshot.params.cuenta;
      this.Cuenta = JSON.parse(localStorage.getItem('cuenta'));
      this.formularioRetiro = this.fb.group({
        retiro: ['', Validators.required],
      });
    }else{
      this.route.navigateByUrl('/');
    }
    
  }

  Retirar(){
    let retiro = {
      fechaUltimaAct: this.getFechaActual(),
      monto: this.formularioRetiro.value.retiro,
      numeroCuenta: this.noCuenta,
      terminal: 'TERM235',
      tipo: 'Retiro',
      usuario: 'u-231'
    }
    this.cuentaService.RetiroCuenta(retiro).subscribe((res)=>{
      Swal.fire({
        icon: 'success',
        title: 'Retiro Exitoso!',
        text: 'El retiro se hiso correctamente'
      });
      this.formularioRetiro.reset();
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
          title: 'No se pudo hacer el retiro',
          text: 'Verifique su conexión con el servidor y la Base de Datos'
        });
      }
     
      this.formularioRetiro.reset();
    })
  }

  Cancelar(){
    this.route.navigateByUrl(`/cuentas/ver-cuentas/${localStorage.getItem('cliente')}`)
  }

  ValidaCant(){
    if(this.formularioRetiro.value.retiro <= this.Cuenta.saldo){
      this.cantidadValida = true;
    }else{
      this.cantidadValida = false;
    }
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

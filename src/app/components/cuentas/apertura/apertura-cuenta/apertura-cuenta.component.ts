import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ClientesService } from 'src/app/services/clientes.service';
import {startWith, map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { CuentasService } from 'src/app/services/cuentas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apertura-cuenta',
  templateUrl: './apertura-cuenta.component.html',
  styleUrls: ['./apertura-cuenta.component.scss']
})
export class AperturaCuentaComponent implements OnInit {

  control = new FormControl();
  public Clientes: any[];
  filteredClientes: Observable<string[]>;
  public estadoCuenta: string;
  public saldoCuenta: number;
  public fechaActualizacion: string;
  public noCuenta: String;
  public cliente: any

  constructor(private clienteService: ClientesService, private cuentaService: CuentasService, private route:Router) { }

  ngOnInit(): void {
    this.estadoCuenta = "Activa";
    this.fechaActualizacion = this.getFechaActual(); 
    this.TraerClientes();
  }

  TraerClientes(){
    this.clienteService.getClientes().subscribe((result)=>{
      this.Clientes = result.response;
      this.filteredClientes = this.control.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
    },err=>{
      Swal.fire({
        icon: 'error',
        title: 'Error al consultar listado de clientes',
        text: 'Verifique su conexión con el servidor y la Base de Datos'
      });
      
      
    })
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
    return anio+"-"+m+"-"+d;
  }

  public RegistrarCuenta(){
    if(this.noCuenta != "" && this.saldoCuenta != undefined && this.cliente != ""){
      let listaTemp = this.Clientes.filter(cliente => {
        if(cliente.nombre == this.cliente){
          return cliente
        }
      });
      if(listaTemp.length == 1){
        //se eligio un usuario existente
        let cliente = listaTemp[0];
        let cuentaAhorro = {
          estado: this.estadoCuenta,
          fechaUltimaAct: this.fechaActualizacion,
          idCliente: cliente.idusuario,
          numeroCuenta: this.noCuenta,
          saldo: this.saldoCuenta
        };
        this.cuentaService.CrearCuenta(cuentaAhorro).subscribe((result)=>{
          console.log(result)
          Swal.fire({
            icon: 'success',
            title: 'Cuenta de ahorro agregada!',
            text: `La cuenta de ahorro para el cliente ${cliente.nombre} ha sido creada correctamente`
          });
          this.incializarValores();
        }, err=>{
          console.log(err)
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
              title: 'Error al registrar cuenta',
              text: 'Verifique su conexión con el servidor y la Base de Datos'
            });
            this.incializarValores();
          }
          
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar Cuenta',
          text: 'Verifique que haya seleccionado al cliente correctamente'
        });
        this.incializarValores();
      }
        
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar Cuenta',
        text: 'Verifique que haya llenado toda la información'
      });
    }
  }

  private _filter(value: string): any[] {
    const filterValue = this._normalizeValue(value);
    return this.Clientes.filter(cliente => this._normalizeValue(cliente.nombre).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  private incializarValores(){
    this.noCuenta = "";
    this.saldoCuenta = 0;
    this.cliente = ""
  }

}

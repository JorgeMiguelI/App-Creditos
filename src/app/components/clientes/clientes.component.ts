import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { CuentasService } from 'src/app/services/cuentas.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})

export class ClientesComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'nombre', 'direccion', 'edad', 'genero', 'cuenta'];
  public ListaClientes;
  public ListaCuentas: any[];

  constructor(private loginService: LoginService, private route: Router, private clientesServices: ClientesService, private cuentaService: CuentasService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null){
      this.TraerClientes();
      this.TraerCuentas();
    }else{
      this.route.navigateByUrl('/');
    }
    
  }

  TraerClientes(){
    this.clientesServices.getClientes().subscribe((result) =>{
      this.ListaClientes = new MatTableDataSource(result.response);
    },err =>{
      Swal.fire({
        icon: 'error',
        title: 'Error al consultar clientes',
        text: 'Verifique su conexión con el servidor y la Base de Datos'
      });
      console.log(err)
    })
  }

  TraerCuentas(){
    this.cuentaService.ObtenerCuentas().subscribe((result)=>{
      let listaTemp = Object.entries(result).map(i => i[1]);
      this.ListaCuentas = listaTemp;
    },err =>{
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ListaClientes.filter = filterValue.trim().toLowerCase();
  }

  AddUser(){
    this.route.navigateByUrl('/clientes/altas');
  }

  VerCuentas(idCliente){
    this.route.navigateByUrl('/cuentas/ver-cuentas/'+ idCliente);
  }

  VerificaExistenciaCuentas(idcliente): boolean{
    if(this.ListaCuentas != undefined){
      let listaExistencia = this.ListaCuentas.filter(cuenta =>{
        if(cuenta.idCliente == idcliente){
          return cuenta;
        }
      })
      if(listaExistencia.length > 0){
        //Existe una cuenta con id de cliente indicado
        return true;
      }
    }
    
    return false;
  }

}


export interface Cliente {
  nombre: string;
  idusuario: string;
  direccion: string;
  edad: number;
  genero: string;
}

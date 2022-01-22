import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta-cliente',
  templateUrl: './alta-cliente.component.html',
  styleUrls: ['./alta-cliente.component.scss']
})
export class AltaClienteComponent implements OnInit {

  public formularioAltas: FormGroup;
  constructor(private fb: FormBuilder, private clienteService: ClientesService, private route:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null){
      this.formularioAltas = this.fb.group({
        nombre: ['', Validators.required],
        direccion: ['', Validators.required],
        edad: ['', Validators.required],
        genero: ['', Validators. required]
      })
    }else{
      this.route.navigateByUrl('/');
    }
    
  }

  async Registrar(){

    let Cliente = {
      nombre: this.formularioAltas.value.nombre,
      direccion: this.formularioAltas.value.direccion,
      edad: this.formularioAltas.value.edad,
      genero: this.formularioAltas.value.genero
    }
    
    try {
      let resp = await this.clienteService.GuardarClientes(Cliente).toPromise();
      Swal.fire({
        icon: 'success',
        title: 'Cliente agregado!',
        text: 'El Cliente ha sido agregado correctamente'
      });
      this.formularioAltas.reset();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al guardar cliente',
        text: 'Verifique su conexión con el servidor y la Base de Datos'
      });
      this.formularioAltas.reset();
    }
    

  }

}

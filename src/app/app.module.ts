import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AltaClienteComponent } from './components/clientes/altas/alta-cliente/alta-cliente.component';
import { HeaderComponent } from './components/header/header.component';
import { AperturaCuentaComponent } from './components/cuentas/apertura/apertura-cuenta/apertura-cuenta.component';
import { VerCuentasComponent } from './components/cuentas/ver-cuentas/ver-cuentas.component';
import { DepositosComponent } from './components/cuentas/depositos/depositos.component';
import { RetirosComponent } from './components/cuentas/retiros/retiros.component';
import { ConsultasComponent } from './components/cuentas/consultas/consultas.component';
import {MatCardModule} from '@angular/material/card';
import { FilterMovPipe } from './pipes/filter-mov.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClientesComponent,
    AltaClienteComponent,
    HeaderComponent,
    AperturaCuentaComponent,
    VerCuentasComponent,
    DepositosComponent,
    RetirosComponent,
    ConsultasComponent,
    FilterMovPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    CommonModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

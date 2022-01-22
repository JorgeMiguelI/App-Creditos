import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaClienteComponent } from './components/clientes/altas/alta-cliente/alta-cliente.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { AperturaCuentaComponent } from './components/cuentas/apertura/apertura-cuenta/apertura-cuenta.component';
import { ConsultasComponent } from './components/cuentas/consultas/consultas.component';
import { DepositosComponent } from './components/cuentas/depositos/depositos.component';
import { RetirosComponent } from './components/cuentas/retiros/retiros.component';
import { VerCuentasComponent } from './components/cuentas/ver-cuentas/ver-cuentas.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { 
    path: '', component: LoginComponent
  },
  {
    path: 'clientes',
    children: [
      {path: '', component: ClientesComponent},
      {path: 'altas', component: AltaClienteComponent}
    ]
  },
  {
    path: 'cuentas',
    children:[
      {path: 'apertura', component: AperturaCuentaComponent},
      {path: 'ver-cuentas/:idCliente', component: VerCuentasComponent},
      {path: 'depositos/:cuenta', component: DepositosComponent},
      {path: 'retiros/:cuenta', component: RetirosComponent},
      {path: 'consultas/:cuenta', component: ConsultasComponent}
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

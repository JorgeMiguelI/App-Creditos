import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CuentasService {

  constructor(private http: HttpClient) { }

  public CrearCuenta(cuenta): Observable<any>{
    return this.http.post<any>(environment.urlendPointCuentas + localStorage.getItem('token'), cuenta);
  }

  public ObtenerCuentas(): Observable<any>{
    return this.http.get<any>(environment.urlendPointCuentas + localStorage.getItem('token'));
  }

  public DepositoCuenta(deposito): Observable<any>{
    return this.http.post<any>(environment.urlendPointTransacciones + localStorage.getItem('token'), deposito);
  }

  public RetiroCuenta(retiro): Observable<any>{
    return this.http.post<any>(environment.urlendPointTransacciones + localStorage.getItem('token'), retiro);
  }

  public VerMovimientos(): Observable<any>{
    return this.http.get<any>(environment.urlendPointTransacciones + localStorage.getItem('token'));
  }

}

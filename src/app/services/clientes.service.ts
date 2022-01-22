import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  getClientes(): Observable<any>{
    return this.http.get<any>(environment.urlendPointUsers);
  }

  GuardarClientes(cliente): Observable<any>{
    return this.http.post<any>(environment.urlendPointUsers, cliente);
  }

}

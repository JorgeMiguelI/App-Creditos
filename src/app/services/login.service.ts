import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public token: string;

  constructor(private http: HttpClient) { }

  Login(infoUser): Observable<any>{
    return this.http.post<any>(environment.urlendPointLogin, infoUser);
  }
}

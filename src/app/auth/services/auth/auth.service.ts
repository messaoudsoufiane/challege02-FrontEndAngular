import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BaseUrl = 'http://localhost:8083/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  register(signupRequest:any): Observable<any> {
    return this.http.post(BaseUrl + 'api/auth/signup', signupRequest);
  }
  login(loginRequest:any): Observable<any> {
    return this.http.post(BaseUrl + 'api/auth/login', loginRequest);
  }
}

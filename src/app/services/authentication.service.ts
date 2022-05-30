import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url=environment.apiBaseUrlAuth;// URL de la API
  currentUserSubject: BehaviorSubject<any>;
  constructor(private http:HttpClient) {
    console.log("El servicio de autenticacion funciona");
    this.currentUserSubject= new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')|| '{}'));
   }

  Login(credentials:any):Observable<any>
  {
    return this.http.post(this.url,credentials).pipe(map(data=>{
      sessionStorage.setItem('currentUser', JSON.stringify(data));
      this.currentUserSubject.next(data);
      console.log(JSON.stringify(data));
      return data;
    }))
  }

  logout() {
    sessionStorage.clear();
  }

  isLoggedIn() {
    if (sessionStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  get AuthenticatedUser(){
    return this.currentUserSubject.value;
  }
   
}

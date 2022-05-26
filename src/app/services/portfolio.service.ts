import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
//import { ConsoleReporter } from 'jasmine';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  getData():Observable<any>{
    return this.http.get('./assets/data/data.json');
  }
  public getUser():Observable<User>{
    return this.http.get<User>(`${this.apiServerUrl}/usuario/id/1`);
  }

  public updateUser(user:User):Observable<User>{
    return this.http.put<User>(`${this.apiServerUrl}/usuario/update`, user);
  }
}

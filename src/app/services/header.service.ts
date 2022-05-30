import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient, private authService: AuthenticationService) { }

  public getUser():Observable<User>{
    return this.http.get<User>(`${this.apiServerUrl}/usuario/id/1`);
  }

  public updateUser(user:User):Observable<User>{
    return this.http.put<User>(`${this.apiServerUrl}/usuario/update`, user);
  }
}

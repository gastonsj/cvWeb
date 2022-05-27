import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experience } from '../models/experiences';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public getExperience():Observable<Experience[]>{
    return this.http.get<Experience[]>(`${this.apiServerUrl}/experience/all`);
  }
  public addExperience(experience:Experience):Observable<Experience>{
    return this.http.post<Experience>(`${this.apiServerUrl}/experience/add`, experience);
  }
  public updateExperience(experience:Experience):Observable<Experience>{
    return this.http.put<Experience>(`${this.apiServerUrl}/experience/update`, experience);
  }
  public deleteExperience(experienceId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/experience/delete/${experienceId}`);
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {
  //user:any;
  public user:User={
    id: 0,
  firstName: "",
  lastName: "",
  email: "",
  birthday: "",
  address: "",
  phone: "",
  about: "",
  url_photo: "",
}
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getUser();
    
  }
  public getUser():void{
    this.userService.getUser().subscribe({
      next:(response:User)=>{
        this.user=response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

}

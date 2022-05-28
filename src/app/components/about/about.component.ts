import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  //user:any;
  //public user:User[]=[];
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
  public editUser:User | undefined;

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
    console.log(this.user);
  }
  public onOpenModal(user?:User):void{
    const container=document.getElementById('main-about-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-bs-toggle','modal');
    this.editUser=user;
    button.setAttribute('data-bs-target','#editUserModal');
    container?.appendChild(button);
    button.click(); 
}
public onUpdateUser(user:User){
  this.editUser=user;
  this.userService.updateUser(user).subscribe({
    next: (response:User) =>{
      this.getUser();
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }
  })
}

}

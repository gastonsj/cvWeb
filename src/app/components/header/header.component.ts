import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: User | undefined;
  public editUser: User | undefined;

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
    this.getUser();
  }

  public getUser(): void{
    this.headerService.getUser().subscribe({
      next: (response: User)=>{
        this.user=response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  constructor(auth:AuthenticationService) { }

  ngOnInit(): void { 
  }
  logout(){

  }
  isLogin(){
  }

}

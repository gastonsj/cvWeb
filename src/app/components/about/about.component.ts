import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  myPortfolio:any;
  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {
    this.readAbout();
  }
  public readAbout() : void{
    this.datosPortfolio.getUser().subscribe(data =>{
      console.log(data);
      this.myPortfolio=data;
    },
    err =>{
      console.log(err);
      console.log("Fallo el about");
    });
  }  

}

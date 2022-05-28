import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Experience } from 'src/app/models/experiences';
import { ExperienceService } from 'src/app/services/experience.service';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  public experience:Experience[]=[];
  public editExperience:Experience | undefined;
  public deleteExperience:Experience | undefined;
  constructor(private experienceService:ExperienceService) { }

  ngOnInit(): void {
    this.getExperience();
  }

  public getExperience():void{
    this.experienceService.getExperience().subscribe({
      next:(Response:Experience[])=>{
        this.experience=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
    console.log(this.experience);
  }

  public onOpenModal(mode:String, experience?:Experience):void{
    const container=document.getElementById('main-experience-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-bs-toggle','modal');
    if(mode==='add'){
      button.setAttribute('data-bs-target','#addExperienceModal');
    }else if(mode ==='delete'){
      this.deleteExperience=experience;
      button.setAttribute('data-bs-target','#deleteExperienceModal');
    }else if(mode==='edit'){
      this.editExperience=experience;
      button.setAttribute('data-bs-target','#editExperienceModal');
    }
    container?.appendChild(button);
    button.click(); 
}
public onAddExperience(addForm:NgForm){
  document.getElementById('add-experience-form')?.click();
  this.experienceService.addExperience(addForm.value).subscribe({
    next: (response:Experience) =>{
      console.log(response);
      this.getExperience();
      addForm.reset();
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
      addForm.reset();
    }
    
  })
}
public onUpdateExperience(experience:Experience){
  this.editExperience=experience;
  console.log(experience);
  this.experienceService.updateExperience(experience).subscribe({
    next: (response:Experience) =>{
      this.getExperience();
      console.log(response);
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }
  })
}
public onDeleteExperience(idExp:number):void{
  this.experienceService.deleteExperience(idExp).subscribe({
    next: (response:void) =>{
      console.log(response);
      this.getExperience();
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }
  })
}

}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Education } from 'src/app/models/education';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  public education:Education[]=[];
  public editEducation:Education | undefined;
  public deleteEducation:Education | undefined;
  constructor(private educationService:EducationService,
              private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.getEducation();

  }

  public getEducation():void{
    this.educationService.getEducation().subscribe({
      next:(Response:Education[])=>{
        this.education=Response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
    console.log(this.education);
  }

  public onOpenModal(mode:String, education?:Education):void{
      const container=document.getElementById('main-container');
      const button=document.createElement('button');
      button.style.display='none';
      button.setAttribute('data-bs-toggle','modal');
      if(mode==='add'){
        button.setAttribute('data-bs-target','#addEducationModal');
        console.log("addEducationModal");
      }else if(mode ==='delete'){
        this.deleteEducation=education;
        button.setAttribute('data-bs-target','#deleteEducationModal');
        console.log("deleteEducationModal");
      }else if(mode==='edit'){
        this.editEducation=education;
        button.setAttribute('data-bs-target','#editEducationModal');
        console.log("editEducationModal");
      }
      container?.appendChild(button);
      button.click(); 
  }
  public onAddEducation(addForm:NgForm){
    console.log("Entra a onAddEducation");
    document.getElementById('add-education-form')?.click();
    this.educationService.addEducation(addForm.value).subscribe({
      next: (response:Education) =>{
        console.log(response);
        this.getEducation();
        addForm.reset();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset();
      }
      
    })
  }
  public onUpdateEducation(education:Education){
    this.editEducation=education;
    this.educationService.updateEducation(education).subscribe({
      next: (response:Education) =>{
        console.log(response);
        this.getEducation();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }
  public onDeleteEducation(idEdu:number):void{
    this.educationService.deleteEducation(idEdu).subscribe({
      next: (response:void) =>{
        console.log(response);
        this.getEducation();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }
  get isLoggedIn() { return this.authService.isLoggedIn(); }
}

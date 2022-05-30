import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  public project:Project[]=[];
  public editProject:Project | undefined;
  public deleteProject:Project | undefined;
  constructor(private projectService:ProjectService,
              private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.getProject();

  }

  public getProject():void{
    this.projectService.getProject().subscribe({
      next:(response:Project[])=>{
        this.project=response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
    console.log(this.project);
  }

  public onOpenModal(mode:String, project?:Project):void{
      const container=document.getElementById('main-project-container');
      const button=document.createElement('button');
      button.style.display='none';
      button.setAttribute('data-bs-toggle','modal');
      if(mode==='add'){
        button.setAttribute('data-bs-target','#addProjectModal');
      }else if(mode ==='delete'){
        this.deleteProject=project;
        button.setAttribute('data-bs-target','#deleteProjectModal');
      }else if(mode==='edit'){
        this.editProject=project;
        button.setAttribute('data-bs-target','#editProjectModal');
      }
      container?.appendChild(button);
      button.click(); 
  }
  public onAddProject(addForm:NgForm){
    this.projectService.addProject(addForm.value).subscribe({
      next: (response:Project) =>{
        console.log(response);
        this.getProject();
        addForm.reset();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset();
      }
      
    })
  }
  public onUpdateProject(project:Project){
    this.editProject=project;
    this.projectService.updateProject(project).subscribe({
      next: (response:Project) =>{
        console.log(response);
        this.getProject();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }
  public onDeleteProject(idProj:number):void{
    this.projectService.deleteProject(idProj).subscribe({
      next: (response:void) =>{
        console.log(response);
        this.getProject();
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }
  get isLoggedIn() { return this.authService.isLoggedIn(); }
}


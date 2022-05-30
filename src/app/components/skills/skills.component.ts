import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Skill } from 'src/app/models/skills';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  public skill:Skill[]=[];
  public editSkill:Skill | undefined;
  public deleteSkill:Skill | undefined;
  constructor(private skillService:SkillService,
              private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.getSkill();

  }

  public getSkill():void{
    this.skillService.getSkill().subscribe({
      next:(response:Skill[])=>{
        this.skill=response;
      },
      error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })
    console.log(this.skill[1]);
  }

  public onOpenModal(mode:String, skill?:Skill):void{
    const container=document.getElementById('main-skill-container');
    const button=document.createElement('button');
    button.style.display='none';
    button.setAttribute('data-bs-toggle','modal');
    if(mode==='add'){
      button.setAttribute('data-bs-target','#addSkillModal');
    }else if(mode ==='delete'){
      this.deleteSkill=skill;
      button.setAttribute('data-bs-target','#deleteSkillModal');
    }else if(mode==='edit'){
      this.editSkill=skill;
      button.setAttribute('data-bs-target','#editSkillModal');
    }
    container?.appendChild(button);
    button.click(); 
}
public onAddSkill(addForm:NgForm){
  document.getElementById('add-skill-form')?.click();
  this.skillService.addSkill(addForm.value).subscribe({
    next: (response:Skill) =>{
      console.log(response);
      this.getSkill();
      addForm.reset();
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
      addForm.reset();
    }
    
  })
}
public onUpdateSkill(skill:Skill){
  this.editSkill=skill;
  document.getElementById('add-skill-form')?.click();
  console.log(this.editSkill);
  this.skillService.updateSkill(skill).subscribe({
    next: (response:Skill) =>{
      console.log(response);
      this.getSkill();
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }
  })
}
public onDeleteSkill(idSkill:number):void{
  this.skillService.deleteSkill(idSkill).subscribe({
    next: (response:void) =>{
      console.log(response);
      this.getSkill();
    },
    error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }
  })
}
get isLoggedIn() { return this.authService.isLoggedIn(); }
}

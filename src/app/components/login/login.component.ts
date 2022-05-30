import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;
  constructor(  
              private formBuilder:FormBuilder,
              private authService: AuthenticationService, 
              private route:Router) {
    this.form=this.formBuilder.group(
      {
        username:['',[Validators.required,Validators.minLength(3)]],
        password:['',[Validators.required,Validators.minLength(3)]]
      }
    )

   }

  ngOnInit(): void {
  }

  get usernameField():any{
    return this.form.get('username');
  }

  get passwordField():any{
    return this.form.get('password');
  }

  onSend(event:Event){
    event.preventDefault;
    console.log(JSON.stringify(this.form.value));
    this.authService.Login(this.form.value).subscribe(data=>{
      console.log("Data: "+ JSON.stringify(data));
      this.route.navigate(['/portfolio']);
    })
  }
  get isLoggedIn() { return this.authService.isLoggedIn(); }
  
  logout(){
    console.log("logout");
    this.authService.logout();
  }
}

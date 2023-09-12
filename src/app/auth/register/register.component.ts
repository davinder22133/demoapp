import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { UtilsModule } from 'src/app/utils/utils.module';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form:FormGroup
  HttpResponse:any
  passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
  constructor( private http: HttpClient,private router: Router,private service:CommonService,private utils:UtilsModule){
    this.form = new FormGroup({
      name:new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.pattern(this.passwordRegex)]),
      confirmPassword: new FormControl('',[Validators.required, Validators.pattern(this.passwordRegex)])
    });

    this.form.get('email')?.setValue(this.service.getLocalStorage().EmailEntered);
  }

  async createUser(){
    let body:any={
      email:this.form.get('email')?.value}


    // CHECK LEAD
    this.HttpResponse= await this.service.httpPostRequest(this.utils.URLs.leadFind,body).toPromise()

      

    if(!this.HttpResponse.data){
      this.router.navigate(['/home']);
      return;
    }  
     body={
      name:this.form.get('name')?.value,email:this.form.get('email')?.value,Password:this.form.get('password')?.value,confirmPassword:this.form.get('confirmPassword')?.value}
      

      // CREATE USER
      this.HttpResponse= await this.service.httpPostRequest(this.utils.URLs.createuserUrl,body).toPromise()
      
      
      
      if(!this.HttpResponse.data){
        alert('error wile creating user please try again')
        this.router.navigate(['/register']);
        return;
      }  
      
        this.router.navigate(['/home']);
       

  }


  Submit(){
    this.createUser();
  }

}

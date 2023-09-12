import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { UtilsModule } from 'src/app/utils/utils.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form:FormGroup
  HttpResponse:any
  passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
  constructor( private http: HttpClient,private router: Router,private service:CommonService,private utils:UtilsModule){
    this.form = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,Validators.pattern(this.passwordRegex)]),
  })
  this.form.get('email')?.setValue(this.service.getLocalStorage().EmailEntered);

}

async loginUser(){
  const body={email:this.form.get('email')?.value,Password:this.form.get('password')?.value}
  let response= await this.service.httpPostRequest(this.utils.URLs.loginUrl,body).toPromise()
  this.HttpResponse=response;
  
  if(!this.HttpResponse.data){

    this.router.navigate(['/home']);
  }

  else{
    this.router.navigate(['/dashboard']);
  }
}

async Submit(){
 this.loginUser();
}


}

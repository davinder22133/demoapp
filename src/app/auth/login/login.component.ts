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
  // LOGIN USER
  let response= await this.service.httpPostRequest(this.utils.URLs.loginUrl,body).toPromise()
  this.HttpResponse=response;
  
  if(!this.HttpResponse.data){

    this.router.navigate(['/home']);
  }

  else{
    this.service.addtoLocalStorage('login',true);
    this.router.navigate(['/dashboard']);
  }
  return;
}

async loginwithGoogle(){
  const body={email:'abc233@gmail.com'}
this.HttpResponse=await this.service.httpPostRequest(this.utils.URLs.checkUserUrl,body).toPromise();
  console.log('userpresent or not ',this.HttpResponse);
  if(this.HttpResponse.data==null){
   const  body={
      name:'acdn',
      email:'abc233@gmail.com',
     
      userType:'Social'}
    let createUser= await this.service.httpPostRequest(this.utils.URLs.createuserUrl,body).toPromise()
    console.log('createdUSr is ',createUser);
    return;
  }

else{
  
}


}

async Submit(){
 
 this.loginUser();
 console.log('after logui sucess');
 
}


}

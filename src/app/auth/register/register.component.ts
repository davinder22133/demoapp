import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { UtilsModule } from 'src/app/utils/utils.module';
import { FileStackService } from '../../file-stack.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form:FormGroup
  ImageUrl:string=''
  imageUploaded:boolean=false
  HttpResponse:any
  passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
  constructor( private http: HttpClient,private router: Router,private filestack:FileStackService,private service:CommonService,private utils:UtilsModule){
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

    



    

    if(this.ImageUrl=='' && this.imageUploaded==true){
      alert('image is still uploading please wait some time');
      return;
    }


     body={
      name:this.form.get('name')?.value,
      email:this.form.get('email')?.value,
      Password:this.form.get('password')?.value,
      confirmPassword:this.form.get('confirmPassword')?.value,
      userType:'direct',
      }
      

      if(this.ImageUrl!=''){
        body.imageUrl=this.ImageUrl;
      }

      // CREATE USER
      this.HttpResponse= await this.service.httpPostRequest(this.utils.URLs.createuserUrl,body).toPromise()
      
      
      
      if(!this.HttpResponse.data){
        alert('error wile creating user please try again')
        this.router.navigate(['/register']);
        return;
      }  
      
        // console.log();
        alert('navingating to dashboard')
        this.service.addtoLocalStorage('login',true);
        this.router.navigate(['/dashboard']);
       

  }

  async upload(event:any){
    this.imageUploaded=true;
    let file=event.target.files[0];
    let result=await this.filestack.FileUpload(file);
   
    this.ImageUrl=result.url;
   
    alert('image uploaded success')
    return result;
  }
  Submit(){
    console.log('sibmit called');
    
    this.createUser();
  }

  formPrint(){
    console.log(this.form);
    
  }
}

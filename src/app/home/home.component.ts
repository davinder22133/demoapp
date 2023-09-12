import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
import { CommonService } from '../common.service';
import { UtilsModule } from '../utils/utils.module';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  useremail: string = '';
  userObject:any={};
  HttpResponse:any=null;
  form:FormGroup
  passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;

  constructor(private router:Router,private service:CommonService,private utils:UtilsModule){
    this.form = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
    
    });

    if(service.getLocalStorage()){
      this.form.get('email')?.setValue(service.getLocalStorage().EmailEntered);
    }

  }



  async CheckUser(){
    const body={email:this.service.getLocalStorage().EmailEntered};
    
    
  //  CHECK USER EXIST IN DB OR NOT
    let response=await this.service.httpPostRequest(this.utils.URLs.checkUserUrl,body).toPromise();
    console.log("response si ",response); // response.data is not accessbile
    this.HttpResponse=response;
    
    if(!this.HttpResponse.data){
      
      // CREATE LEAD
     let leadCreated= await this.service.httpPostRequest(this.utils.URLs.createLead,body).toPromise()
    
    
    
      this.router.navigate(['/register']);
    }

    else{
      this.router.navigate(['/login']);
    }

  }

 
  Submit(){
    let email=this.form.get('email')?.value;
    this.service.RegisterLoginCheck=true;
   
    
  
   this.service.addtoLocalStorage("EmailEntered",email);
   setTimeout(()=>{this.CheckUser()},1000);
  // this.utils.TimerFunction(this.CheckUser,2000)
  }
  






  
}

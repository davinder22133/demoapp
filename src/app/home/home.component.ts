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
  }



  async CheckUser(){
    const body={email:this.service.getLocalStorage().EmailEntered};
    
    
    const url=this.utils.URLs.checkUserUrl;
    let response=await this.service.httpPostRequest(url,body).toPromise();
    console.log("response si ",response); // response.data is not accessbile
    this.HttpResponse=response;
  
    if(this.HttpResponse.data==null){
      const url=this.utils.URLs.createLead;
      await this.service.httpPostRequest(url,body).toPromise()
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
  }
  






  
}

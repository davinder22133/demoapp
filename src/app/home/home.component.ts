import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
import { CommonService } from '../common.service';
import { UtilsModule } from '../utils/utils.module';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  useremail: string = '';
  userObject:any={};
  HttpResponse:any=null;
  LoadingScreen:boolean=false
  form:FormGroup
  passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;

  constructor(private router:Router,private service:CommonService,private utils:UtilsModule,private authService: SocialAuthService){
    this.form = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
    
    });

    if(service.getLocalStorage()){
      this.form.get('email')?.setValue(service.getLocalStorage().EmailEntered);
    }

  }



  async CheckUser(){
    const body={email:this.service.getLocalStorage().EmailEntered};
    
    this.LoadingScreen=true;
    console.log('Loading scrren become true');
    
  //  CHECK USER EXIST IN DB OR NOT
  this.HttpResponse=await this.service.httpPostRequest(this.utils.URLs.checkUserUrl,body).toPromise();
   
  console.log('http resoinie of check is ',this.HttpResponse);
  
    if(!this.HttpResponse.data){
      
      // CREATE LEAD
     let leadCreated= await this.service.httpPostRequest(this.utils.URLs.createLead,body).toPromise()
    
    
     this.LoadingScreen=false;
      this.router.navigate(['/register']);
    }

    else{
      this.LoadingScreen=false;
      this.router.navigate(['/login']);
    }

  }

 
  Submit(){
    let email=this.form.get('email')?.value;
    this.service.RegisterLoginCheck=true;
   
    
  
   this.service.addtoLocalStorage("EmailEntered",email);
  
  this.CheckUser()
  }
  


  user!: SocialUser;
loggedIn: boolean=false;


  //  ngOnInit() {
  
    
  //   this.authService.authState.subscribe(async (user) => {
  //     this.user = user;
    
  //     this.loggedIn = (user != null);
  //     if(this.user==null) return;

  //     console.log('user si ',this.user);
      
  //     this.HttpResponse=await this.service.httpPostRequest(this.utils.URLs.checkUserUrl,{email:this.user.email}).toPromise();
   
  //      if(this.HttpResponse.data==null){
       
  //       console.log('null present');
        
  //   const  body={
  //     name:this.user.firstName,
  //     email:this.user.email,
     
  //     userType:this.user.provider}
  //   let createUser:any= await this.service.httpPostRequest(this.utils.URLs.createuserUrl,body).toPromise();
  //   console.log('user created si ',createUser);
  //  if(createUser.data==null){
  //   alert(createUser.error);
  //   this.router.navigate(['/'+this.service.getLocalStorage().previousUrl])
  //  }
  // }


  // this.service.addtoLocalStorage('login',true);
  // this.service.addtoLocalStorage('EmailEntered',this.user.email);
  // this.router.navigate(['/dashboard']);

  //   });





  // }




  loginWithFacebook(){
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }



  
}

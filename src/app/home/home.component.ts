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
      alert('login go')
      
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
  


  user!: SocialUser;
loggedIn: boolean=false;


   ngOnInit() {
    console.log('this is ngOnit called');
    
    this.authService.authState.subscribe(async (user) => {
      this.user = user;
      console.log('inside subscirbe ',this.user);
      this.loggedIn = (user != null);
      if(this.user==null) return;
      // console.log('this user comgin is  ',this.user);
     
      let userExist=this.HttpResponse=await this.service.httpPostRequest(this.utils.URLs.checkUserUrl,{email:this.user.email}).toPromise();
      console.log('userExist is ',userExist);
       if(this.HttpResponse.data==null){
        // console.log('inide data null ');
        
    const  body={
      name:this.user.firstName,
      email:this.user.email,
     
      userType:this.user.provider}
    let createUser= await this.service.httpPostRequest(this.utils.URLs.createuserUrl,body).toPromise()
    console.log('createdUSr is ',createUser);
    
   ;
  }


  this.service.addtoLocalStorage('login',true);
  this.service.addtoLocalStorage('EmailEntered',this.user.email);
  this.router.navigate(['/dashboard']);

    });





  }




  loginWithFacebook(){
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }



  
}

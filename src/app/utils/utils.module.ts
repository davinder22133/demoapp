import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class UtilsModule {

  URLs:any={
    checkUserUrl:'http://localhost:4500/Routes/v1/auth/CheckUser',
    createLead:'http://localhost:4500/Routes/v1/adddetails/lead/',
    loginUrl:'http://localhost:4500/Routes/v1/auth/login',
    createuserUrl:'http://localhost:4500/Routes/v1/auth/signup',
    leadFind:'http://localhost:4500/Routes/v1/adddetails/leadfind/',

  }

  //  TimerFunction(fn:any,delay:any) {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(fn());
  //     }, delay);
  //   });
  // }
  


 }

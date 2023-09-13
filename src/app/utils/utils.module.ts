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
    checkUserUrl:'http://localhost:4500/Routes/v1/users/check',
    createLead:'http://localhost:4500/Routes/v1/lead/createLead/',
    loginUrl:'http://localhost:4500/Routes/v1/auth/login',
    createuserUrl:'http://localhost:4500/Routes/v1/auth/signup',
    leadFind:'http://localhost:4500/Routes/v1/lead/LeadFind/',
    addUserDetails:'http://localhost:4500/Routes/v1/adddetails/',
    getParticularUser:'http://localhost:4500/Routes/v1/adddetails/get',
    getLimitedUsers:'http://localhost:4500/Routes/v1/users/getlimited',
    DeleteUser:'http://localhost:4500/Routes/v1/users/delete',
    searchUser:'http://localhost:4500/Routes/v1/users/search'
  }

  //  TimerFunction(fn:any,delay:any) {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(fn());
  //     }, delay);
  //   });
  // }
  


 }
 
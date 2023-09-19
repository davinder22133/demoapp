import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../common.service';



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
    addUserDetails:'http://localhost:4500/Routes/v1/userDetails/add',
    getParticularUser:'http://localhost:4500/Routes/v1/users/get',
    getLimitedUsers:'http://localhost:4500/Routes/v1/users/getlimited',
    DeleteUser:'http://localhost:4500/Routes/v1/users/delete',
    searchUser:'http://localhost:4500/Routes/v1/users/search'
  }

  constructor(private service:CommonService){}

  


 }
 
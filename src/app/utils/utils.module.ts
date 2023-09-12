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
    createLead:'http://localhost:4500/Routes/v1/adddetails/lead/'
  }


 }

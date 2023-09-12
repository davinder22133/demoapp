import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import * as _ from 'lodash';
import { UtilsModule } from '../utils/utils.module';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  UserDetails!: any;
  HttpResponse:any
  check: any = 0;
  Address:any= this.fb.group({
        houseNo: this.fb.control('', [Validators.required]),
        StreetNo: this.fb.control('', [Validators.required]),
        City: this.fb.control('', [Validators.required]),
        State: this.fb.control('', [Validators.required]),
        Country: this.fb.control('', [Validators.required])
      })
    


    Education:any= this.fb.group({
          SchoolName_CollegeName: this.fb.control('', [Validators.required]),
          Percentage_CGPA: this.fb.control('', [Validators.required]),
          Class_Degree: this.fb.control(''),
          Year: this.fb.group({
            To: this.fb.control('', [Validators.required]),
            From: this.fb.control('', [Validators.required])
          })
        })
    
    


    Experience:any=  this.fb.group({
        CompanyName: this.fb.control('', [Validators.required]),
        Designation: this.fb.control('', [Validators.required]),
        Year: this.fb.group({
          To: this.fb.control('', [Validators.required]),
          From: this.fb.control('', [Validators.required])
        })
      })
   

  constructor(private fb: FormBuilder, private http: HttpClient,private utils:UtilsModule, private router:Router,private service:CommonService) {
    this.UserDetails = this.fb.group({
      Address:this.fb.array([this.Address]),
      Education:this.fb.array([this.Education]),
      Experience:this.fb.array([this.Experience])
    })
  
  }


  addForm(el: any){
   

    if (el == 'Address'){
      el=this.Address
    
      this.UserDetails.get('Address').push(_.cloneDeep(this.Address));
     
    }
    else if(el=='Education'){
      this.UserDetails.get('Education').push(_.cloneDeep(this.Education));
    }

    else{
      this.UserDetails.get('Experience').push(_.cloneDeep(this.Experience));
    }

  }

  removeAddress(i: any, el: any) {
    let x = this.UserDetails.get(el).removeAt(i);
  }


async createuserDetails(){
 
  const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });


  const body={data:this.UserDetails.value,email:this.service.getLocalStorage().EmailEntered };
 this.HttpResponse=await this.service.httpPostRequest(this.utils.URLs.addUserDetails,body).toPromise();

 if(!this.HttpResponse.data){
  alert('Error coming while feeding data');
  return;
 }
 alert('data filled sucess data');
  
}

  submit_btn() {
    this.service.RegisterLoginCheck=false;
   this.createuserDetails();
  }

  getControlValue(el: any) {
    return (this.UserDetails.get(el) as FormArray).controls;
  }


  Validator(el: any, i: any) { 
    return this.UserDetails.get(el).controls[i];
  }



  
  next() {
    this.check += 1;
  }

  prev() {
    this.check -= 1;
  }

 async PatchData(){
   const body={email:this.service.getLocalStorage().EmailEntered};
   this.HttpResponse=await this.service.httpPostRequest(this.utils.URLs.getParticularUser,body).toPromise();
   console.log('responsei is ',this.HttpResponse);
   if(this.HttpResponse.data.data){
  
      Object.keys(this.HttpResponse.data.data.UserDetails).forEach((e)=>{
      
        for(let i=0;i<this.HttpResponse.data.data.UserDetails[e].length-1;i++){
         
            this.addForm(e);
          
          
        }
  
  
        
        
      })
  
  
      
      this.UserDetails.patchValue(this.HttpResponse.data.UserDetails);
   }
  }
  
  logout(){
   localStorage.removeItem('userObject');
    this.router.navigate(['/home']);
  }
}

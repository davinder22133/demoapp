import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../common.service';
import * as _ from 'lodash';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
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
   

  constructor(private fb: FormBuilder, private http: HttpClient,  public activatedRoute: ActivatedRoute,private utils:UtilsModule, private authService: SocialAuthService,private router:Router,private service:CommonService) {
    this.UserDetails = this.fb.group({
      Address:this.fb.array([_.cloneDeep(this.Address)]),
      Education:this.fb.array([_.cloneDeep(this.Education)]),
      Experience:this.fb.array([_.cloneDeep(this.Experience)])
    })
    const body={email:this.service.getLocalStorage().EmailEntered};
    this.PatchData(body);

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

 async PatchData(body:any){
   
   console.log('isnide patch value coming ',body);
   
   this.HttpResponse=await this.service.httpPostRequest(this.utils.URLs.getParticularUser,body).toPromise();
  //  console.log('responsei is ',this.HttpResponse.data.userDetials);
   if(this.HttpResponse.data?.userDetials){
    console.log('insdie repsonsei ',Object.keys(this.HttpResponse.data.userDetials));
    
      Object.keys(this.HttpResponse.data.userDetials).forEach((e)=>{
        console.log('e is ',e);
          if(Array.isArray(this.HttpResponse.data.userDetials[e])){
           
            
        for(let i=0;i<this.HttpResponse.data.userDetials[e].length-1;i++){
          console.log('insdie add form');
          
            this.addForm(e);
          
          
        }
      }
  
        
        
      })
  
  
      
      this.UserDetails.patchValue(this.HttpResponse.data.userDetials);
   }
  }
  
 signOut(){
    this.authService.signOut();
  }

  async logout(){
  //  localStorage.removeItem('userObject');
   let email=this.service.getLocalStorage().EmailEntered;

   this.HttpResponse=await this.service.httpPostRequest(this.utils.URLs.checkUserUrl,{email:email}).toPromise()
   
   
    if(this.HttpResponse.data.userType=='facebook' || this.HttpResponse.data.userType=='google'){
      this.signOut();
     
    }
  
  localStorage.removeItem('userObject');
    this.router.navigate(['/home']);
  }
  id:any
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      console.log('id come is ',this.id);
      const body={_id:this.service.getLocalStorage()._id};
      this.PatchData(body)
    })
  }

}

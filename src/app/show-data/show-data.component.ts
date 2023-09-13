import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonService } from '../common.service';
import { UtilsModule } from '../utils/utils.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.css']
})
export class ShowDataComponent {
  // data:any='';
  headers:any=[];
  count:any
  // constructor( private http: HttpClient) {
  //   const body={email:'abc@gmail.com'}
  //   this.http.post('http://localhost:4500/Routes/v1/adddetails/get', body).subscribe((data) => {
  //     console.log("data is ", data);
  //     this.data=data;
  //     this.data=this.data.data;
  //   // console.log(this.data.user);
  //   console.log(this.data.userDetials," dat acoming is ");
  //     // this.data.use
  //     let keys=Object.keys(this.data.userDetials)
  //     console.log("key is ",keys);
  //     this.headers=keys.splice(1,keys.length-2);
  //     console.log("lek ",keys, " data is ",this.data);
      

   
  // });
  // }



  // helper(el:any){
  //   if(this.data=='') return;
    
  //   let x=this.data.userDetials[el];
  //   console.log("x is ",x);
    
  //   return this.data.userDetials[el];
  // }



  async GetAgain(){
    const params = new HttpParams()
    .set('startIndex', this.startIndex)  // Use strings as values for parameters
    .set('endIndex', this.endIndex); 
     
this.apiData= await this.service.httpPostRequest(this.utils.URLs.getLimitedUsers,{},params).toPromise();
    
  }

  async getData(){
    const params = new HttpParams()
    .set('startIndex', this.startIndex)  // Use strings as values for parameters
    .set('endIndex', this.endIndex);  // Use strings as values for parameters

this.apiData= await this.service.httpPostRequest(this.utils.URLs.getLimitedUsers,{},params).toPromise();
  this.headers.push('Basic Info ');
  console.log('apidata ois ',this.apiData);
  
  let keys=Object.keys(this.apiData.data[0].userDetials)
  keys=keys.slice(1,keys.length-1)
  console.log(keys ,' xi s');
  this.headers=keys;
    this.count=this.apiData.count;
 let x= this.ArrayFiller();
    console.log('x is ',this.newArray);
    
 return;
  }


  filterSub(Element:any,key:any){
    // console.log('funcioton called ',Element);
    let keys:any=[]
    keys=Object.keys( Element.userDetials[key][0])
   keys.pop()
  //  console.log('keys is ',keys);
   return keys
   
  }



  lengthCount(Element:any,key:any){
    console.log(Object.keys(Element.data[0].userDetials[key][0]), ' leu so ',key);
      let length=Object.keys(Element.data[0].userDetials[key][0]).length-1;
  //  let keys=Object.keys( Element.userDetials[key][0])
  //  console.log('Eelemt is ',Element.userDetials[key],'lengt h is ',keys.length);
   
  return 5;
    // return [keys.length-1]
  }

  constructor(private http:HttpClient,private router:Router,private service:CommonService,private utils:UtilsModule){
    console.log("i am called");
 
  
    
    
   

    
  }

  async ngOnInit() { // Assuming this code is in an Angular component
    // console.log("i am called");
    this.getData(); 
    this.ArrayFiller();
    // console.log("i am  last called ",this.apiData);
  
  }
  
 
  apiData: any = null;



//   // console.log("el is ",el);
  
//   let maxlength=el.Education.length;
//   if(maxlength<el.experience.length) maxlength=el.experience.length;
//   if(maxlength<el.user.length) maxlength=el.user.length;
//   return maxlength
  
// }
  // length(el:any,length:any):number{
  //   return el.value.length;
  // }

//   headers:any=[];
  vast(el:any,length=''):any{
   
    console.log('el coming is ',el);
    
    if(Array.isArray(el.value)){
      return el.value;
    }
    return [];
  }
  




async delete(row:any){
console.log('de;ete row is ',row._id);
const body={_id:'64faad447a8d2f4f1e97264e'}
let x=await this.service.httpDeleteRequest(this.utils.URLs.DeleteUser,body).toPromise();
  console.log('x sio ',x);
  
}


update(row:any){
  console.log('row is ',row);
  
  this.service.addtoLocalStorage("EmailEntered",row.email);
 
  this.router.navigate(['/dashboard']);
}


search_text:any='';
async search_data(){
console.log('searchtext is ',this.search_text);
const body={name:this.search_text};
this.apiData.data=await this.service.httpPostRequest(this.utils.URLs.searchUser,body).toPromise();
console.log('api data is ',this.apiData);

}


currentPage = 1;
selectedOption:any=2;
options:any=[2,4,6];
newArray:any=null;

updateBtn(){
  this.ArrayFiller();
  this.currentPage=1;
  this.updatePagedIndex();
  this.startIndex=0;
  this.getData()
}
  
  startIndex:any=0;
  endIndex:any=this.selectedOption;


  previousPage(){
    if (this.currentPage > 1) {
            this.currentPage--;
            this.updatePagedIndex();
           
          this.GetAgain();
  
          }
  }


   totalPages() {
    return Number(this.count  / this.selectedOption);
  }

   ArrayFiller() {
  
    
    this.newArray=[];
    for(let i=1;i<=this.totalPages();i++){
      this.newArray.push(i);
    }
  }

    updatePagedIndex() {


    this.startIndex = Number(this.currentPage - 1) * Number(this.selectedOption);
    this. endIndex = Number(this.startIndex) + Number(this.selectedOption);
   
   
  }


    nextPage(){
    if (this.currentPage < this.newArray.length) {
      this.currentPage++;
      this.updatePagedIndex();
      this.GetAgain();
    }
  }




  goToPage(pageNumber:any){
    
    
    if (pageNumber >= 1 && pageNumber <= this.newArray.length) {
      this.currentPage = pageNumber;
      this.updatePagedIndex();
      this.GetAgain();
  
    }}

}

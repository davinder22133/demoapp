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
subheaders:any=[]



  async GetAgain(){
    const params = new HttpParams()
    .set('startIndex', this.startIndex)  
    .set('endIndex', this.endIndex); 
     
this.apiData= await this.service.httpPostRequest(this.utils.URLs.getLimitedUsers,{},params).toPromise();
    console.log('api data is ',this.apiData);
    
  }

  async getData(){
    const params = new HttpParams()
    .set('startIndex', this.startIndex)  
    .set('endIndex', this.endIndex);  

this.apiData= await this.service.httpPostRequest(this.utils.URLs.getLimitedUsers,{},params).toPromise();
  this.headers.push('Basic Info ');
  console.log('apidata ois ',this.apiData);
  
    // for(this.apiData)
    for(let i=0;i<this.apiData.data.length;i++){
      if(this.apiData.data[i].userDetials){
        // console.log('ehloo ');
        
        let keys=Object.keys(this.apiData.data[i].userDetials)
        keys=keys.slice(1,keys.length-1)
        this.headers=keys;
        this.subheaders.push(this.apiData.data[i].userDetials.Address[0]);
        this.subheaders.push(this.apiData.data[i].userDetials.Education[0]);
        this.subheaders.push(this.apiData.data[i].userDetials.Experience[0]);
        break;
      }
    }



  

  console.log(this.headers ,' xi s', this.subheaders,' subheaders');

    this.count=this.apiData.count;
 this.ArrayFiller();
   
    
 return;
  }




  lengthCount(i:any){
   
    
  return Object.keys(this.subheaders[i]).length;
   
  }

  constructor(private http:HttpClient,private router:Router,private service:CommonService,private utils:UtilsModule){
   
}

  async ngOnInit() {
   
   await this.getData(); 
    this.ArrayFiller();
    
  
  }
  
 
  apiData: any = null;




  


OBjectKeysToArray(el:any){
 
  let array=Object.keys(el)
  array.pop()

 
  
  return array;
}

ObjecKeysValues(el:any){

  
  let array=Object.keys(el)
  array.pop()
  
  let valuesArray:any=[];
  array.map((e)=>{
  valuesArray.push(el[e]);
  })
  return valuesArray;
}


CheckYearArray(el:any){
 
  

  if(typeof(el)=='object'){
   const result = el.From.split('-')[0] + '-' + el.To.split('-')[0];
   return result
  }

  return el;
}


async delete(row:any){
console.log('de;ete row is ',row._id);
const body={_id:'64faad447a8d2f4f1e97264e'}
let x=await this.service.httpDeleteRequest(this.utils.URLs.DeleteUser,body).toPromise();
  console.log('x sio ',x);
  
}


update(row:any){
  // console.log('row is ',row);
  


 localStorage.removeItem('userObject');
 this.service.addtoLocalStorage("EmailEntered",row.email);
  this.service.addtoLocalStorage('previousUrl' ,'showDetials')
  this.router.navigate(['/login']);
}


search_text:any='';
async search_data(){

  const params = new HttpParams()
.set('startIndex', this.startIndex)  
.set('endIndex', this.endIndex); 
console.log('searchtext is ',this.search_text);
const body={name:this.search_text};
this.apiData.data=await this.service.httpPostRequest(this.utils.URLs.searchUser,body,params).toPromise();
console.log('api data is ',this.apiData);



 
// this.apiData= await this.service.httpPostRequest(this.utils.URLs.getLimitedUsers,{},params).toPromise();

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

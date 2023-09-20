import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonService } from '../common.service';
import { UtilsModule } from '../utils/utils.module';
import { Router } from '@angular/router';
import { debounceTime, fromEvent, interval, switchMap } from 'rxjs';
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

fillSubheaders(apiData:any){
  for(let i=0;i<this.apiData.data.length;i++){
    // console.log('ehloo ');
    // console.log('api data is ',this.apiData);
    this.headers=[];
    this.subheaders=[]
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
}

  async GetAgain(){
this.getLimitedData()
  }

  async getData(){
    const params = new HttpParams()
    .set('startIndex', this.startIndex)  
    .set('endIndex', this.endIndex);  

this.apiData= await this.service.httpPostRequest(this.utils.URLs.getLimitedUsers,{},params).toPromise();

  this.headers.push('Basic Info ');

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
  //  if(thi)
   if( this.subheaders[i]==undefined) return 1;
    // console.log('array ',this.subheaders[i],'length is ',Object.keys(this.subheaders[i]).length);
    
  return Object.keys(this.subheaders[i]).length-1;
   
  }

  constructor(private http:HttpClient,private router:Router,private service:CommonService,private utils:UtilsModule){
   
}

  async ngOnInit() {
    this.getLimitedData();
  //  await this.getData(); 
    // this.ArrayFiller();
    
  
  }
  
 
  apiData: any = null;




  


OBjectKeysToArray(el:any){
  
  if(el==undefined) return [];

  let array=Object.keys(el)
  array.pop()

  // console.log('el copme s ',el, 'array is ',array);
  
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
 
  
  // console.log('el coming is ',el);
  
  if(typeof(el)=='object'){

   const result = el.From + '-' + el.To;
   return result
  }

  return el;
}


async delete(row:any){
// console.log('de;ete row is ',row._id);
const body={_id:'64faad447a8d2f4f1e97264e'}
let x=await this.service.httpDeleteRequest(this.utils.URLs.DeleteUser,body).toPromise();
  // console.log('x sio ',x);
  
}


update(row:any){
alert('insie update')
//  this.service.addtoLocalStorage("EmailEntered",row.email);
console.log('rpw id is ',row._id);

 this.router.navigate(['/dashboard',row._id])  
  this.service.addtoLocalStorage('previousUrl' ,'showDetials')
// this.router.navigate(['/login']);                                                                                        
}


search_text:any='';
async search_data(){

  const params = new HttpParams()
.set('startIndex', this.startIndex)  
.set('endIndex', this.endIndex); 
// console.log('searchtext is ',this.search_text);
const body={name:this.search_text};
this.apiData.data=await this.service.httpPostRequest(this.utils.URLs.searchUser,body,params).toPromise();
// console.log('api data is ',this.apiData);



 
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
  this.GetAgain()
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



    //  GET LIMITED USEER DATA
    async getLimitedData(){

      let params = new HttpParams()
     params=params.set('startIndex', this.startIndex)  
     params=params.set('endIndex', this.endIndex);  


  
      

      let headers= new HttpHeaders()

      if(localStorage.getItem('token')){
      headers=headers.set('token',localStorage.getItem('token') as string);
      }
  
      this.service.HTTPGetRequest(this.utils.URLs.getLimitedUsers,headers,params).subscribe({
        next:(data)=>{console.log('DATA OF LIMITED USERS IS ',data);
        }
      })
      }



      globalObject=this;


      func(){
        console.log('fun called ',this);
        const body={name:this};
        let headers= new HttpHeaders()

  if(localStorage.getItem('token')){
  headers=headers.set('token',localStorage.getItem('token') as string);
  
  }

  console.log('REQYEST GIUBG TI VISIT ');

  const service=inject(CommonService)
  console.log('SERVICE IS ',service);
  
//   service.HTTPPostRequest(this.utils.URLs.searchUser,body,headers).subscribe((data)=>{
//   console.log('DATA IS ',data);
  
//  })
        
      }

      inputValue:string='';
    array:any=[];
    timeout:any;


    @ViewChild('myInput') myInput:ElementRef | undefined;
      // SEARCH WITH DEBOUNCE
      UpdateText(){
          
        
        //  console.log('vak US ',val);
         
       
        
        // clearTimeout(this.timeout);
      
        
        //   this.timeout = setTimeout(() => this.func.apply(val), 2000)
        // console.log('timer is ',this.timeout);




        // ------------------------
        // var input = document.querySelector('input');


         
        var observable = fromEvent(this.myInput?.nativeElement, 'input');
        console.log('OBSERVABLE IS ',observable);
        let x=observable.pipe(
          debounceTime(5000),
         
          )

        console.log('x s ',x);
        
        x.subscribe((data)=>{
          console.log('data i s ',data);
          
        })
      }

    

}

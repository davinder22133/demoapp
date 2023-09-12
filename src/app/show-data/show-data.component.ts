import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.css']
})
export class ShowDataComponent {
  // data:any='';
  // headers:any;
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

  constructor(private http:HttpClient,private service:CommonService){
    console.log("i am called");
    
    this.orginalData=this.show()
    
    console.log("orgiaina daa is ",this.orginalData,);
    
  }
  selectedOption: any= 2; // Variable to store the selected value
  options: any[] = [1,2,3]; 
  data :any= [
    {
      Education: [{ x: 10, y: 11 },{x:11}],
      experience: [{ x: 10, y: 11 }],
      user: [{ x: 10, y: 11 }],
    },
    {
      Education: [{ x: 102, y: 11 },{ x: 102, y: 11 },{ x: 102, y: 11 },{ x: 102, y: 11 }],
      experience: [{ x: 103, y: 11 }],
      user: [{ x: 102, y: 11 }],
    },
    {
      Education: [{ x: 104, y: 11 }],
      experience: [{ x: 105, y: 11 }],
      user: [{ x: 105, y: 11 }],
    },
  ];
  apiData: any = null;

maxRowSpan(el:any):number{

  // console.log("el is ",el);
  
  let maxlength=el.Education.length;
  if(maxlength<el.experience.length) maxlength=el.experience.length;
  if(maxlength<el.user.length) maxlength=el.user.length;
  return maxlength
  
}
  length(el:any,length:any):number{
    return el.value.length;
  }

  headers:any=[];
  vast(el:any,length=''):any{
   
    // console.log("el is ",el);
    if(Array.isArray(el.value)){
      return el.value;
    }
    return [];
   
  
    
    return this.data[el];
  }
  currentPage = 1;
  // startIndex:any=0;
  startIndex :any= (this.currentPage - 1) * this.selectedOption;
  endIndex = this?.startIndex + this.selectedOption;
  TotalCount:any=0;
  updateBtn(){
    // console.log("Data count is ",this.apiData.count);
    this.newArray=[];
for (let i = 1; i <=(this.TotalCount/this.selectedOption); i++) {
  this.newArray.push(i);
}


console.log("this new array is ",this.newArray);


  }

  newArray:any=null;
// endIndex:any=this.selectedOption;
  ngOnInit() {
    // Fetch data from your API and assign it to apiData when it's available
    // let data = { startIndex: this.startIndex, endIndex:this.endIndex  };
    console.log("this startindex is ",this.startIndex, " end index is ",this.endIndex);
    
    let params = new HttpParams();
    params = params.set('startIndex', this.startIndex);
    params = params.set('endIndex', this.endIndex);

    console.log("param is ",params);
    
   
    const obv = this.http.post('http://localhost:4500/Routes/v1/adddetails/getall',{params})
    
    obv.subscribe((data:any) => {
      this.apiData = data;
      console.log("apiiii data is ",this.apiData);
      // const newArray = [];
      console.log("Data count is ",this.apiData.count);
      this.TotalCount=this.apiData.count;
      this.newArray=[];
  for (let i = 1; i <=(this.apiData.count/this.selectedOption); i++) {
    this.newArray.push(i);
  }

  console.log("nedwArray is ",this.newArray);
  
  // return newArray;
      this.headers=Object.keys(this.apiData.data[0].userDetials);
   
       this.headers.pop();
       this.filterData();
    });
  }
  orginalData:any=[];


  // itemsPerPage = 10;


  updatePagedIndex() {
    this.startIndex = (this.currentPage - 1) * this.selectedOption;
    this. endIndex = this.startIndex + this.selectedOption;
    this.show();
    // this.newArray = this.data.slice(startIndex, endIndex);
  }

  async show(){
    // const params = new HttpParams().set('startIndex', this.startIndex).set('endIndex', this.endIndex);
    let param=new HttpParams();
    param=param.append("startIndex",0);
  await this.http.post('http://localhost:4500/Routes/v1/adddetails/getall',{param}).toPromise().then((El)=>{
    // console.log("el count is ",El);
    
    return El;
  })
   
  }
 

  previousPage(){
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedIndex();
    }
  }

  goToPage(pageNumber:any){
    if (pageNumber >= 1 && pageNumber <= this.newArray/this.selectedOption) {
      this.currentPage = pageNumber;
      this.updatePagedIndex();
    }
  }


  nextPage(){
    if (this.currentPage < this.newArray.length) {
      this.currentPage++;
      this.updatePagedIndex();
      this.show();
    }
  }
  
  filterData(){

    let data:any=[];
      this.apiData.data.map((el:any)=>{
        console.log("el is ",el);
        // data.id=[].el._id;
        let arr:any={};
        arr._id=el._id;
        data.push(arr);
        // console.log(el.userDetials.);
        console.log("flaterd is ",el.userDetials.Address.flat());
        
        

      })

      console.log("data is ",data);
      

  }


  delete(id:any){
    const body={_id:id};
  this.http.post('http://localhost:4500/Routes/v1/adddetails/delete',body).subscribe((el)=>{
    console.log("data is ",el);
    
  })
  }


  edit(){
    
  }

}

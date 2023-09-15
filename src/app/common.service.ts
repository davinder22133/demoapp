import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  userObject: any = {};
  RegisterLoginCheck: boolean = false;
  constructor(private http: HttpClient) { }





  getLocalStorage() {

    const storedData = localStorage.getItem('userObject') as string;
    const parsedData = JSON.parse(storedData);
    return parsedData;

  }

  addtoLocalStorage(key: any, value: any) {

    
    
    if (this.getLocalStorage()) { // when data present is not null
      let object = this.getLocalStorage();
     
      
      object[key] = value;
     
      localStorage.setItem('userObject', JSON.stringify(object));
      return;
    }


    this.userObject[key] = value;
    localStorage.setItem('userObject', JSON.stringify(this.userObject));
  }


  httpPostRequest(url: any, body:any=null,params:any=null) {
    
    // if(params==null )
  
    if(body==null && params!=null){
      return this.http.post(url,{},{params});
    }
   
    if(params==null && body!=null){
       
    return this.http.post(url, body);
    }
    return this.http.post(url,body,{params});
  }


  httpDeleteRequest(url:any,body:any){
  
    
    return this.http.delete(url,body);
  }


 

}

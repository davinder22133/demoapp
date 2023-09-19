import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  userObject: any = {};
  RegisterLoginCheck: boolean = false;
  constructor(private http: HttpClient) { }
  Token:any




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


    // console.log('token inside service is ',localStorage.getItem('token') as string);
    
    let headers= new HttpHeaders()

    if(localStorage.getItem('token')){

    
    headers=headers.set('token',localStorage.getItem('token') as string);
    console.log(headers, ' HEADER ISNDIE SERVICE SI ')
    }
    
  
    if(body==null && params!=null){
      return this.http.post(url,{},{params,headers});
    }
   
    if(params==null && body!=null){
       
    return this.http.post(url, body,{headers});
    }
    return this.http.post(url,body,{params,headers});
  }


  httpDeleteRequest(url:any,body:any){
  
    
    return this.http.delete(url,body);
  }


 

}

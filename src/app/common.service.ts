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
    console.log('params i s ',params,' body is ',body);
    
    // return this.http.post('http://localhost:4500/Routes/v1/users/getlimited',{},{params});
    if(body==null && params!=null){
      return this.http.post(url,{},{params});
    }
   
    if(params==null && body!=null){
      console.log('this cpart called');
      
    return this.http.post(url, body);
    }
    return this.http.post(url,body,{params});
  }


  httpDeleteRequest(url:any,body:any){
    console.log('url is ',url,'bod y is ',body);
    
    return this.http.delete(url,body);
  }


}

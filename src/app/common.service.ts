import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  userObject: any = {};
  RegisterLoginCheck:boolean=false;
  constructor( private http: HttpClient) { }


 


  getLocalStorage() {

    const storedData = localStorage.getItem('userObject') as string;
    const parsedData = JSON.parse(storedData);
    return parsedData;

  }

  addtoLocalStorage(key: any, value: any) {
    if (!this.getLocalStorage()) { // when data present is not null
      let object = this.getLocalStorage();
      localStorage.setItem('userObject', JSON.stringify(object));
      return;
    }
    this.userObject[key] = value;
    localStorage.setItem('userObject', JSON.stringify(this.userObject));
  }


  httpPostRequest(url:any,body:any){
    return this.http.post(url,body);
  }

}
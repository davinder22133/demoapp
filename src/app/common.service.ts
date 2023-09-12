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


  httpPostRequest(url: any, body: any) {
    const params = new HttpParams()
    .set('page', 1)
    return this.http.post(url, body,{params});
  }

}

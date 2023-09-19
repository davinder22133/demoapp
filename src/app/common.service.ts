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
    document.cookie = "username=John Doe";
  
    if(body==null && params!=null){
      return this.http.post(url,{},{params,headers,withCredentials: true });
    }
   
    if(params==null && body!=null){
       
    return this.http.post(url, body,{headers });
    }
    return this.http.post(url,body,{params,headers,withCredentials: true });
  }



  HTTPGetRequest(url:string,headers:any=null){


        
    return new Promise((res,rej)=>{
      let response;
      if(headers){
       
         response= (this.http.get(url,{headers}));
         response.subscribe(
          
          {
          
        next:  (data:any)=>{
         
          
          res(data);
        
         },
         

         error:(error:any)=>{
         
          
          rej(error);
        
         }


        }
         
         )
         
        

        
      } 
        
       
        else{
          
             response= (this.http.get(url,{headers}));
         response.subscribe(
          
          {
          
        next:  (data:any)=>{
         
          
          res(data);
        
         },
         

         error:(error:any)=>{
         
          
          rej(error);
        
         }


        }
         
         )
         
       
        }
     


    })


    

  }

  httpDeleteRequest(url:any,body:any){
  
    
    return this.http.delete(url,body);
  }



  


  HTTPostRequest(url:any,body:any,params:any=null){

   
    return new Promise((res,rej)=>{
      if(params){
        this.http.post(url,body,{params}).subscribe(
          {
          
       next:   (data)=>{
          res(data);
        },


        error:(error)=>{
          rej(error)
        }
      }
        
        )
    
    }
  
    else{
      this.http.post(url,body).subscribe(
        {
        
     next:   (data)=>{
      res(data);
      },


      error:(error)=>{
        rej(error);
      }
    }
      
      )
    }
  
  
  }
    
    
   


    )



   
    

  }
 

}

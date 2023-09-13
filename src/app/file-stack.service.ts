import { Injectable } from '@angular/core';
import * as filestack from 'filestack-js'
@Injectable({
  providedIn: 'root'
})
export class FileStackService {
  API_KEY='AkKMi90tGTyeF4PzYL7z0z'
  constructor() { }

FileUpload(file:any){
    const client=filestack.init(this.API_KEY);
    console.log('client is ',client);
    
    return client.upload(file);
}

}

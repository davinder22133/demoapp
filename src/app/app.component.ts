import { Component } from '@angular/core';
import { CommonService } from './common.service';
import { HttpParams } from '@angular/common/http';
import { UtilsModule } from './utils/utils.module';
import { FileStackService } from './file-stack.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  async getData(){
    const params = new HttpParams()
    .set('startIndex', '0')  // Use strings as values for parameters
    .set('endIndex', '10');  // Use strings as values for parameters

  return await this.service.httpPostRequest(this.utils.URLs.getLimitedUsers,{},params).toPromise()
  }
  constructor(private service:CommonService,private utils:UtilsModule,private filestack:FileStackService){
    // this.getData()
  }
 
  upload(event:any){
    let file=event.target.files[0];
    let promise=this.filestack.FileUpload(file);
    promise.then((res)=>{
      console.log('res is ',res);
      
    })
  }


}

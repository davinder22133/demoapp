import { Component } from '@angular/core';
import { CommonService } from './common.service';
import { HttpParams } from '@angular/common/http';
import { UtilsModule } from './utils/utils.module';
import { FileStackService } from './file-stack.service';
// import { GoogleLoginProvider, SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
// import { FacebookLoginProvider } from "@abacritt/angularx-social-login";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  // async getData(){
  //   const params = new HttpParams()
  //   .set('startIndex', '0')  // Use strings as values for parameters
  //   .set('endIndex', '10');  // Use strings as values for parameters

  // return await this.service.httpPostRequest(this.utils.URLs.getLimitedUsers,{},params).toPromise()
  // }
  // constructor(private service:CommonService,private utils:UtilsModule,private filestack:FileStackService){
  //   // this.getData()
  // }
 
  // upload(event:any){
  //   let file=event.target.files[0];
  //   let promise=this.filestack.FileUpload(file);
  //   promise.then((res)=>{
  //     console.log('res is ',res);
      
  //   })
  // }

  // user!: SocialUser;
  // loggedIn: boolean=false;
  // ngOnInit() {
  //   console.log('this is ngOnit called');
    
  //   this.authService.authState.subscribe((user) => {
  //     this.user = user;
  //     this.loggedIn = (user != null);
  //     console.log('this is ',this.user);
      
  //   });
  // }

  // loginWithGoogle(){
  //   this.authService.authState.subscribe((user) => {
  //     this.user = user;
  //     this.loggedIn = (user != null);
  //     console.log('this is ',this.user);
      
  //   });
  // }

  // logOut(){
  //   this.authService.signOut();
  // }

  // signInWithFB(): void {
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((res)=>{
  //     console.log('login success by facenbook');
      
  //   });;
  // }

  // signOut(): void {
  //   this.authService.signOut();
  // }

}

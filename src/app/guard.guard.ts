import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CommonService } from './common.service';

export const guardGuard: CanActivateFn = (route, state) => {
  const currentRoutes=state.url.split('/')[1]; // as url is /home so we changed to home

  const service=inject(CommonService)
  const router=inject(Router);
  let previousUrl;


  
  // log
  if(!service.getLocalStorage()){

    service.addtoLocalStorage('previousUrl','home')
   
    router.navigate(['/home']);
    return true;
  }


  if(currentRoutes=='showDetials'){
    service.addtoLocalStorage('previousUrl','showDetials')
    return true;
  }

  else{
    previousUrl=service.getLocalStorage().previousUrl;
  }
 
  if(currentRoutes=='showDetials'){
    return true;
  }  

  console.log('current route is ',currentRoutes);
  
  if(currentRoutes=='login' && previousUrl=='showDetials' ){
    
    // localStorage.removeItem('userObject');
    return true;
  }


 

  const restrictedRoutes:any={
    home:['dashboard','login','register'],
    login:['dashboard','register'],
    register:['dashboard','login'],
    dashboard:['home','login','register'],
    showDetials:['home','register']
  }






  
  //  if user is login and try to go to dashboard
  if( service.getLocalStorage() && service.getLocalStorage().login && currentRoutes=='dashboard'){
    service.addtoLocalStorage('previousUrl','dashboard');
    return true;
  }
  






  // if user is on home and he entered email and than click button either go to register or login 
  if(service.RegisterLoginCheck &&((currentRoutes=='login') || (currentRoutes=='register')) && ((previousUrl=='home') )){
    service.RegisterLoginCheck=false;
    // localStorage.setItem('previousUrl',currentRoutes);
    service.addtoLocalStorage('previousUrl',currentRoutes);
    return true;

  }






  

  //  when user clicks on logout and than user navigates to home from dashboard
  if(!service.getLocalStorage() && (previousUrl=='dashboard')){
    return true;
  }


  //  if previous url is home and user try to go dashboard
  if(restrictedRoutes[previousUrl].includes(currentRoutes) ){
    console.log("inside back condition ",previousUrl);
    
router.navigate(['/'+previousUrl]);
  return false;
  }




 service.addtoLocalStorage('previousUrl',currentRoutes);

return true;
};

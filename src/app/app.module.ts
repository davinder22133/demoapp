import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UtilsModule } from './utils/utils.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { guardGuard } from './guard.guard';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { ShowDataComponent } from './show-data/show-data.component';
import { SocialLoginModule,SocialAuthServiceConfig, FacebookLoginProvider} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
const routes: Routes = [

  { path: 'home', component: HomeComponent ,canActivate:[guardGuard]},
  { path: 'showDetials', component: ShowDataComponent,canActivate:[guardGuard]},
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  { path: 'dashboard/:_id', component: DashboardComponent ,canActivate:[guardGuard]},
  { path: 'dashboard', component: DashboardComponent ,canActivate:[guardGuard]},
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    ShowDataComponent
  ],
  imports: [
    BrowserModule,
    GoogleSigninButtonModule,
    FormsModule,
    UtilsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('869689378054-tqlqcd7aetp1tamvdkle5n4f6pouun38.apps.googleusercontent.com'),
          },


          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('983459126246537')
          }
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

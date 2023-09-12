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
import { ShowDataComponent } from './show-data/show-data.component';
const routes: Routes = [

  { path: 'home', component: HomeComponent ,canActivate:[guardGuard]},
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
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
    FormsModule,
    UtilsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

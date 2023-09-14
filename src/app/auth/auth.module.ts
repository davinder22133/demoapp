import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { guardGuard } from '../guard.guard';

const routes: Routes = [

  { path: 'login', component: LoginComponent,canActivate:[guardGuard] },
  { path: 'register', component: RegisterComponent ,canActivate:[guardGuard]},

];


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,

  ],
  imports: [
    // GoogleSigninButtonModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }

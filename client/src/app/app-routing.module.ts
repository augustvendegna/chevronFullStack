import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { SubmissionsComponent } from './submissions/submissions.component';

const routes: Routes = [

  {path: '', component:LoginComponent},
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignUpComponent},
  {path: 'home', component:HomeComponent},
  {path: 'submissions', component:SubmissionsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes), IonicModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

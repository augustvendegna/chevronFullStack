
import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { ValueServiceService } from './value-service.service';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Router,NavigationEnd, Event as NavigationEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Chevron DSC';
  
  public isSignedin: boolean;
  public login: LoginComponent;
  public isMenuPage : boolean = false;

  event

  constructor(private router:Router){
    this.isSignedin = false;
    //this.login = new LoginComponent;
    
    this.isMenuPage = false;

    this.event = this.router.events.subscribe((event : NavigationEvent) => {
      if(event instanceof NavigationEnd){
        console.log(this.router.url);
        if(this.router.url === "/login" || this.router.url === "/signup" || this.router.url === "/"){
          this.isMenuPage= false;
        }
      }
    });

  }
  public setMenuPage(bool:boolean){
    this.isMenuPage = bool;
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.setItem('first_name', "YOURE NOT SIGNED IN!");
  }

  public getItem(item:string){
      return localStorage.getItem(item);
  }

}

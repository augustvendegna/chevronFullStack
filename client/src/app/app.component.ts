
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
  public isMenuPage : boolean = true;
  public current_chal : number;
  
  event;

  constructor(private router:Router,private valueService: ValueServiceService){
    this.isSignedin = false;
    //this.login = new LoginComponent;
    this.current_chal = parseInt(localStorage.getItem('currentChallenge'));
    
    

    this.event = this.router.events.subscribe((event : NavigationEvent) => {
      if(event instanceof NavigationEnd){
        console.log(this.router.url);
        if(this.router.url === "/login" || this.router.url === "/signup" || this.router.url === "/"){
          this.isMenuPage= false;
        }
        else {
          this.isMenuPage = true;
        }
      }
    });

  }
  public setMenuPage(bool:boolean){
    console.log(this.isMenuPage);
    this.isMenuPage = true;
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.setItem('first_name', "YOU'RE NOT SIGNED IN!");
  }

  public getItem(item:string){
      return localStorage.getItem(item);
  }

  public updateChallenge(event : any) {
    console.log(this.current_chal);
    localStorage.setItem('current_challenge', this.current_chal.toString());

    this.valueService.getChallengeInfo().subscribe((data: Object[]) => {
      let rawResp = JSON.stringify(data);
      rawResp = rawResp.replaceAll("{", "");
      rawResp = rawResp.replaceAll("\"", "");
      rawResp = rawResp.replaceAll("}]", "");
      rawResp = rawResp.replaceAll(":", ",");

      let useable = rawResp.split(',')
      
      localStorage.setItem("author", useable[1]);
      localStorage.setItem("challenge_desc", useable[3]);
      localStorage.setItem("challenge_name", useable[5]);


    });

    //location.reload();
  }

}

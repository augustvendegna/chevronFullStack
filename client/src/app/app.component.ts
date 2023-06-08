
import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { ValueServiceService } from './value-service.service';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Router,NavigationEnd, Event as NavigationEvent, RouterLink } from '@angular/router';

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
  public challengeList : [String[]] = [[]];
  
  event;

  constructor(private router:Router,private valueService: ValueServiceService){
    this.isSignedin = false;
    this.current_chal = parseInt(localStorage.getItem('currentChallenge'));
    
    this.getChallenges();

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

  public getChallenges(){
    this.valueService.getChallanges().subscribe((data: Object[]) => {
      let rawResp = JSON.stringify(data);
      rawResp = rawResp.replaceAll("{", "");
      rawResp = rawResp.replaceAll("}", "");
      rawResp = rawResp.replaceAll("]", "");
      rawResp = rawResp.replaceAll("\"", "");
      rawResp = rawResp.replaceAll("}]", "");
      rawResp = rawResp.replaceAll(":", ",");

      let useable = rawResp.split(',');
      

      for(let i = 0; i < useable.length; i+=4){
        this.challengeList.push([useable[i+1], useable[i+3]]);
      }
      this.challengeList.shift();
      //console.log(this.challengeList);
    });
  }

  public updateChallenge(event : any) {
    console.log(this.current_chal);
    localStorage.setItem('current_challenge', this.current_chal.toString());

    this.valueService.getChallengeInfo().subscribe((data: Object[]) => {
      let rawResp = JSON.stringify(data);
      //console.log(rawResp);
      rawResp = rawResp.replaceAll("{", "");
      rawResp = rawResp.replaceAll('\n', " ");
      rawResp = rawResp.replaceAll("}", "");
      rawResp = rawResp.replaceAll("]", "");
      rawResp = rawResp.replaceAll("\"", "");
      rawResp = rawResp.replaceAll('}]', "");
      rawResp = rawResp.replaceAll(".", ",");
      rawResp = rawResp.replaceAll('author:', "author,");
      rawResp = rawResp.replaceAll('description:', "description,");
      rawResp = rawResp.replaceAll('challenge_name:', "challenge_name,");

      let rawResp2 = rawResp;


      rawResp2 = rawResp2.replaceAll('public_start_date:', "public_start_date,");
      rawResp2 = rawResp2.replaceAll('public_end_date:', "public_end_date,");
      rawResp2 = rawResp2.replaceAll('private_start_date:', "private_start_date,");
      rawResp2 = rawResp2.replaceAll('private_end_date:', "private_end_date,");
      rawResp2 = rawResp2.replaceAll("T", " ");
      //rawResp = rawResp.replaceAll(":", ",");
      let useable = rawResp.split(',')
      let useable2 = rawResp2.split(',')
      console.log(useable);
      localStorage.setItem("author", useable[1]);
      let curDesc = useable[3].replaceAll("  ", ", ");
      let public_start_date = useable2[7];
      let public_end_date = useable2[10];
      let private_start_date = useable2[13];
      let private_end_date = useable2[16];
      localStorage.setItem("challenge_desc", curDesc);
      localStorage.setItem("challenge_name", useable[5]);
      localStorage.setItem("public_start_date", public_start_date);
      localStorage.setItem("public_end_date", public_end_date);
      localStorage.setItem("private_start_date", private_start_date);
      localStorage.setItem("private_end_date", private_end_date);

      console.log(useable2[7])
      console.log(useable2[10])
      console.log(useable2[13])
      console.log(useable2[16])

      location.reload();
    });
    
  }

}

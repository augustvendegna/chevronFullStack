import { NgModule, Component, ContentChild } from '@angular/core';
import { AppComponent } from '../app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ValueServiceService } from '../value-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public email: string;
  public password: string;
  
  public response: Object[];
  

  // const { Pool, Client } = require("pg"); // idk what that is
  //Client = require("pg");


  constructor(private valueService: ValueServiceService, private router : Router){
    
  }
  

  public login() {
    
    //console.log('Username: ' + this.username);
    //console.log('Password: ' + this.password);


    this.valueService.getUser(this.email, this.password).subscribe((data: Object[]) => {
      this.response = data;
    
    //check response to see if the user exists
    resp : String;
    var resp = JSON.stringify(this.response[0]);
    //console.log(resp);
    
    resp = resp.replaceAll(":", ",");
    var splitResp = resp.split(",");
    console.log(splitResp);
    if (this.response.length == 1 && splitResp[15]) { // account is enabled as well
      // backend found a single entry in the databse that matches the provided credentials
      localStorage.setItem('is_admin', splitResp[21].slice(0,-1));
      var first_name = splitResp[3].substring(1);
      first_name = first_name.slice(0, -1);
      localStorage.setItem('first_name', first_name);
      localStorage.setItem('UID', splitResp[1]);
      localStorage.setItem('email', this.email);
      localStorage.setItem('password', this.password); // probably not needed? dont think we will need it again
      this.router.navigate(['home']);
    }

    });

    // maybe unsubscribe?
    //this.writeCreds();
  }


  


}

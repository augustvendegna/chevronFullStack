import { NgModule, Component, ContentChild } from '@angular/core';
import { AppComponent } from '../app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ValueServiceService } from '../value-service.service';
import { HttpClient } from '@angular/common/http';


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
  dbCreds = {
    user: "postgres",
    host: "localhost",
    database: "users",
    port: 5432,
  };


  constructor(private valueService: ValueServiceService){
  }
  

  public login() {
    
    //console.log('Username: ' + this.username);
    //console.log('Password: ' + this.password);


    this.valueService.getUser(this.email, this.password).subscribe((data: Object[]) => {
      this.response = data;
    });
    console.log(this.response);
    // maybe unsubscribe?
    //this.writeCreds();
  }


  


}

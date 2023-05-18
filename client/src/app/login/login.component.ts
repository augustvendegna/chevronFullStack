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
  public validInfo: boolean;
  public first: string;
  public last: string;
  public email: string;
  public password: string;
  public passwordOne: string;
  public passwordTwo: string;
  public clickedSignUp: boolean;
  
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
    this.clickedSignUp = false;
    this.validInfo = true;
  }
 
  public onSignUpClick(){
    
    this.clickedSignUp = true;
    console.log(this.clickedSignUp);
    
  }

  public createAccount(){
    console.log("user wants to create account");

    if (this.first == null || this.last == null || this.email == null || this.passwordOne == null || this.passwordTwo == null) {
      console.log("Empty fields found.")
      this.validInfo = false;
    }

    if (this.email.includes('@chevron.com')){
      console.log("Email is valid");
      
    }
    else{
      console.log("Email does not belong to chevron!");
      this.validInfo = false;
    }

    if (this.passwordOne === this.passwordTwo && this.passwordOne != null) {
      console.log("Provided passwords match!");
      
    }
    else{
      console.log("Passwords do not match!");
      this.validInfo = false;
    }


    if (this.passwordOne.length >= 8) {
	    console.log("minimum length achieved");
    } else {
	    console.log("not minimum length");
	    this.validInfo = false;
    }

    var character = '';
    var i = 0;
    while (i <= this.passwordOne.length) {
	    character = this.passwordOne.charAt(i);
		  if (character.match(character.toUpperCase())) {
			  console.log("character is uppercase");
        console.log(character);
			  break;
		  } else {
        console.log("character is not uppercase");
      }
      if (i === this.passwordOne.length) {
        this.validInfo = false;
        break;
      }
	    i++;
    }

    character = '';
    i = 0;
    while (i <= this.passwordOne.length){
	    character = this.passwordOne.charAt(i);
	    if (!isNaN(parseInt(character))) {
		    console.log("character is a number");
        console.log(character);
		    break;
	
	    } else {
        console.log("character is not a number");
      }
      if (i === this.passwordOne.length) {
        this.validInfo = false;
        break;
      }
      i++;
    }

    /*if (this.passwordOne.match('^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$')) {
	    console.log("Minimum password requirements are met!"); 
    } else{
	    console.log("At least one of the password requirements are not met!");
	    this.validInfo = false;
    }*/


    if (this.validInfo){ // all info on the sign up page was interpreted to be correct
      console.log("Sending information to database.");
      this.password = this.passwordOne;

      this.valueService.addUser(this.first, this.last, this.email, this.password, true, true)?.subscribe(_ => {
        //this.login();
      });
    }


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

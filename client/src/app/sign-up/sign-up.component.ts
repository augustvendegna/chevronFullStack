import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ValueServiceService } from '../value-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  public validInfo: boolean;
  public first: string;
  public last: string;
  public email: string;
  public password: string;
  public passwordOne: string;
  public passwordTwo: string;
  public clickedSignUp: boolean;
  
  public response: Object[];

  constructor(private valueService: ValueServiceService, private router : Router){
    this.clickedSignUp = false;
    this.validInfo = true;
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
    while (i < this.passwordOne.length) {
	    character = this.passwordOne.charAt(i);
      if (character.match(character.toUpperCase()) && isNaN(parseInt(character))) {
			  console.log("character is uppercase");
        console.log(character);
			  break;
		  } else {
        console.log("character is not uppercase");
      }
      if (i === this.passwordOne.length - 1) {
        console.log("hello?");
        this.validInfo = false;
        break;
      }
	    i++;
    }

    character = '';
    i = 0;
    while (i < this.passwordOne.length){
	    character = this.passwordOne.charAt(i);
	    if (!isNaN(parseInt(character))) {
		    console.log("character is a number");
        console.log(character);
		    break;
	
	    } else {
        console.log("character is not a number");
      }
      if (i === this.passwordOne.length - 1) {
        console.log("hello");
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

      this.valueService.addUser(this.first, this.last, this.email, this.password, true, false)?.subscribe(_ => {
        //this.login();
      });

      // we need to route
      this.router.navigate(["/login"]);
    }


  }

}

import { Component } from '@angular/core';
import { ValueServiceService } from '../value-service.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  public passwordOne:string;
  public passwordTwo:string;
  public targetEmail:string;
  public response: Object[];
  public isChangingAccount: boolean;

  public targetUserIsAdmin: boolean;
  public targetUserIsEnabled: boolean;
  public invalidUser: boolean;


  constructor(private valueService: ValueServiceService){
    this.isChangingAccount = false;
    this.invalidUser = false;
  }

  public changePassword(){

    if (this.passwordOne != this.passwordTwo){
      alert("passwords do not match!");
      return;
    }
    if (this.passwordOne.length >= 8) {
	    console.log("minimum length achieved");
    } else {
	    console.log("not minimum length");
	    alert("password does not meet requirements");
      return;
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
        alert("password does not meet requirements");
        return;
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
        alert("password does not meet requirements");
        return;
      }
      i++;
    }
    
    this.valueService.updatePassword(localStorage.getItem('email'), this.passwordOne)?.subscribe(_ => {
      //this.login();
    });
    alert("password change confirmed");
  }

  public getIsChangingAccount(){
    return this.isChangingAccount;
  }

  public getAdminStatus(){
    if (localStorage.getItem('is_admin') == 'false'){
      return false;
    }
    return true;
  }


  public async getTargetUserInfo(){
    var respString: string;
    this.valueService.getTargetUserInfo(this.targetEmail).subscribe((data: Object[]) => {
      this.response = data;
    

    var resp = JSON.stringify(this.response);

    resp = resp.replaceAll(":", ",");
    resp = resp.replaceAll("}]", "");
    var splitResp = resp.split(",");
    console.log(splitResp);
    //console.log(splitResp);

    if (splitResp.length == 1){
      this.invalidUser = true;
      return;
    } else {this.invalidUser = false}

    if (splitResp[21] == 'false'){
      this.targetUserIsAdmin = false;
    }
    else { this.targetUserIsAdmin = true; }
    if (splitResp[15] == 'false'){
      this.targetUserIsEnabled = false;
    }
    else { this.targetUserIsEnabled = true; }
    this.isChangingAccount = true;
    });
  }

  public applyUserChanges(){

    this.valueService.updateTargetUser(this.targetUserIsEnabled, this.targetUserIsAdmin, this.targetEmail)?.subscribe(_ => {
      //this.login();
    });

    this.isChangingAccount = false;
  }
}

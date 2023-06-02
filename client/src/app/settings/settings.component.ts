import { Component } from '@angular/core';
import { ValueServiceService } from '../value-service.service';
import { UploadService } from '../submissions/upload.service';

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
  public resetTargetUserPassword: boolean;
  public invalidUser: boolean;

  public answerKey: File;
  public sampleData: File;
  public challengeDescription: string;
  public authorName: string;
  public pubStartDate: string;
  public pubEndDate: string;
  public priStartDate: string;
  public priEndDate: string;
  public algoType: string;


  constructor(private valueService: ValueServiceService, private uploadService: UploadService){
    this.isChangingAccount = false;
    this.invalidUser = false;
    this.resetTargetUserPassword = false;
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
      // nothing here
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
    
    if (this.resetTargetUserPassword){
      this.valueService.updatePassword(this.targetEmail, "Chevron!3")?.subscribe(_ => {
        //this.login();
      });
      this.resetTargetUserPassword = false;
    }

    this.isChangingAccount = false;
  }

  public onKeyFileChange(event: any){
    //console.log(event.target.files[0]);
    this.answerKey = event.target.files[0];
  }

  public onSampleFileChange(event: any){
    //console.log(event.target.files[0]);
    this.sampleData = event.target.files[0];
  }

  public uploadNewChallenge(){
    // needs answer key, description, sample dataset, author name, public phase start/end dates, private start + end, 
    // and test algorihtm
    console.log(this.challengeDescription);
    this.uploadService.createNewChallenge(this.answerKey, this.challengeDescription, this.sampleData, this.authorName, this.pubStartDate, this.pubEndDate, this.priStartDate, this.priEndDate, this.algoType).subscribe((data: Object[]) => {
      alert("Uploaded")
    });
  }
}

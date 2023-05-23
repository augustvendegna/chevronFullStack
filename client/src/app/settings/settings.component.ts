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

  async applyUserChanges(){

    await this.valueService.updateTargetUser(this.targetUserIsEnabled, this.targetUserIsAdmin, this.targetEmail);

    this.isChangingAccount = false;
  }
}

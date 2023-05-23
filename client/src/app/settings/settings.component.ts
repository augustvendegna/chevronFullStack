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


  constructor(private valueService: ValueServiceService){
    this.isChangingAccount = false;
  }

  public changePassword(){
    // comunicate with back end
    
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

  public getTargetUserInfo(){
    var respString: string;
    this.valueService.getTargetUserInfo(this.targetEmail).subscribe((data: Object[]) => {
      this.response = data;
    });
    var resp = JSON.stringify(this.response);
    resp = resp.replaceAll(":", ",");
    var splitResp = resp.split(",");
    console.log(splitResp);
    this.isChangingAccount = true;
  }

  public applyUserChanges(){
    this.isChangingAccount = false;
  }
}

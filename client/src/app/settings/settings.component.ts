import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  public passwordOne:string;
  public passwordTwo:string;
  public targetEmail:string;

  public changePassword(){
    // comunicate with back end
    
  }

  public getAdminStatus(){
    if (localStorage.getItem('is_admin') == 'false'){
      return false;
    }
    return true;
  }
}

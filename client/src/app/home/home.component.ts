import { Component } from '@angular/core';
import { ValueServiceService } from '../value-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  public response: Object[];
  public first_name:string [];
  public last_name:string[];
  public score:string[];
  
  constructor(private valueService: ValueServiceService, private router : Router){
    //problem with call below
    this.valueService.getLeaderboardInfo().subscribe((data: Object[]) => {
    this.response = data;
    //check response to see if the user exists
    resp : String;
    var resp = JSON.stringify(this.response[0]);
    //console.log(resp);
    
    resp = resp.replaceAll(":", ",");
    var splitResp = resp.split(",");
    console.log(splitResp);
    var i:number;

    });
    
  }

}

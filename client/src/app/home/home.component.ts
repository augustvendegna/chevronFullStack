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

    //problems:
    //1. the data arrays aren't stored properly and are undefined
    //2. missing data from query in the code, but is shown to be retrieved

    for(i = 0; i > splitResp.length/3;i++){
      this.first_name[i] = splitResp[i];
      this.last_name[i] = splitResp[i+1];
      this.score[i] = splitResp[i+2];
      localStorage.setItem('first_name', this.first_name[i]);
      localStorage.setItem('last_name', this.last_name[i]);
      localStorage.setItem('score', this.score[i]);
    }
    });
    
  }

}

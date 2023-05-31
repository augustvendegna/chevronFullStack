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
  public splitResp: String[];
  public leaderboard: [String[]] = [[]];
  
  constructor(private valueService: ValueServiceService, private router : Router){
    this.valueService.getLeaderboardInfo().subscribe((data: Object[]) => {
    this.response = data;
    
    //check response to see if the user exists
    resp : String;
    var resp = JSON.stringify(this.response);
    //console.log(resp);
    
    resp = resp.replaceAll(":", ",");
    resp = resp.replaceAll("}", "");
    resp = resp.replaceAll("]", "");
    resp = resp.replaceAll("{", "");
    resp = resp.replaceAll("[", "");
    resp = resp.replaceAll("\"", "");
    this.splitResp = resp.split(",");

    //problems:
    //1. the data arrays aren't stored properly and are undefined
    //2. missing data from query in the code, but is shown to be retrieved
    
    this.updateLeaderBoard();
    
    });
    
  }
  public updateLeaderBoard(){
    
    for(let i = 0; i < this.splitResp.length; i+=4){
      var curRow: String[] = [];

        console.log(this.splitResp);
      
        curRow.push(this.splitResp[i+1]);
        curRow.push(this.splitResp[i+3]);
        this.leaderboard.push(curRow);
    }
  }
}

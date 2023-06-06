import { Component } from '@angular/core';
import { ValueServiceService } from '../value-service.service';
import { Router } from '@angular/router';
import { UploadService } from '../submissions/upload.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  public response: Object[];
  public splitResp: String[];
  public leaderboard: [String[]] = [[]];
  
  constructor(private valueService: ValueServiceService, private router : Router, private uploadService: UploadService){
    
    var currChallenge = localStorage.getItem('current_challenge');
    this.uploadService.getTestFlag(currChallenge).subscribe((data: Object[]) => {
      resp : String;
      var temp : Object[] = data;
      var resp = JSON.stringify(temp);
      
      resp = resp.replaceAll(":", ",");
      resp = resp.replaceAll("}", "");
      resp = resp.replaceAll("]", "");
      resp = resp.replaceAll("{", "");
      resp = resp.replaceAll("[", "");
      resp = resp.replaceAll("\"", "");
    
      var formated = resp.split(",")
      var testFlag = formated[1];
      //console.log(testFlag);

    //console.log(localStorage.getItem('current_challenge'));

    this.valueService.getLeaderboardInfo(testFlag).subscribe((data: Object[]) => {
    this.response = data;
    
    //check response to see if the user exists
    resp : String;
    var resp = JSON.stringify(this.response);
    
    
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
  });
    
  }

  public getItem(item:string){
    return localStorage.getItem(item);
  }

  public updateLeaderBoard(){
    
    for(let i = 0; i < this.splitResp.length; i+=4){
      var curRow: String[] = [];
        curRow.push(this.splitResp[i+1]);
        curRow.push(this.splitResp[i+3]);
        this.leaderboard.push(curRow);
    }
    
  }

  public downloadFile(){
    window.open("https://google.com");
  }

}

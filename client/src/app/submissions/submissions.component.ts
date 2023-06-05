import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ValueServiceService } from '../value-service.service';
import { Router } from '@angular/router';
import { UploadService } from './upload.service';
import { Timestamp } from 'rxjs';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent {
  public selectedFile: File;
  fileName = '';

  public challenge_id: number;
  public is_public: boolean;
  public user_id: number;
  public score: number;

  constructor(private uploadService: UploadService) {}

  onFileChange(event: any) {
    console.log(event.target.files[0])
	  this.selectedFile = event.target.files[0];
  }

  submitForm() {
    this.challenge_id = parseInt(localStorage.getItem('current_challenge'));
    if (this.selectedFile) {
      this.fileName = this.selectedFile.name;
      if(this.fileName.substring(this.fileName.lastIndexOf('.')+1) != "csv"){
        alert("incorrect file type")

      }
      else{
      
      var response: Object[];
      var testFlag: Object[];
      var splitResp2: Object[];
      localStorage.setItem('CID', this.challenge_id.toString());
      //var dates: Number [];
      this.uploadService.getDates(localStorage.getItem('CID')).subscribe((data: Object []) => {
        response = data;
        var resp = JSON.stringify(response[0]);
        resp = resp.replaceAll("\":\"", ",");
        resp = resp.replaceAll(".", ",");
        resp = resp.replaceAll("-", "/");
        resp = resp.replaceAll("T", " ");
        resp = resp.replaceAll("}", ",");
        var splitResp = resp.split(",");
        console.log(splitResp)
        var public_end_date = new Date(splitResp[1]).getTime();
        console.log(public_end_date);
        var private_end_date = new Date(splitResp[4]).getTime();
        console.log(private_end_date);
        const now = new Date().getTime();
        console.log(now);
        if(now < public_end_date){
          this.is_public = true;
        }
        else if(now > public_end_date && now < private_end_date){
          this.is_public = false;
        }
        //dates.push(public_end_date);
        //dates.push(private_end_date);
        console.log(this.is_public);

         this.uploadService.sentInfo(this.fileName, this.challenge_id, this.is_public, parseInt(localStorage.getItem('UID')), this.score).subscribe(resp => {
          alert("sent");
          this.uploadService.getSubmissionID(parseInt(localStorage.getItem('UID'))).subscribe((data: Object[]) => {
            response = data;
            var resp = JSON.stringify(response[0]);
            resp = resp.replaceAll(":", ",");
            resp = resp.replaceAll("}", ",");
            var splitResp = resp.split(",");
            this.uploadService.addSubmission(this.selectedFile, splitResp[1]).subscribe(resp => {
              alert("uploaded")
            });
            this.uploadService.getTestFlag(localStorage.getItem('CID')).subscribe((data: Object[]) => {
              testFlag = data;
              var resp2 = JSON.stringify(testFlag[0]);
              resp2 = resp2.replaceAll(":", ",");
              resp2 = resp2.replaceAll("}", ",");
              resp2 = resp2.replaceAll(/["']/g, ",");
              var splitResp2 = resp2.split(",");
              this.uploadService.computeScore(parseInt(splitResp[1]), splitResp2[4].toString()).subscribe(resp => {
              });
  
            });
            });
            alert("computed")
        });
      });
      }
      } 
       else {
      alert("Please select a file first")
    }
  }
}

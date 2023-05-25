import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ValueServiceService } from '../value-service.service';
import { Router } from '@angular/router';
import { UploadService } from './upload.service';

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
    this.challenge_id = 1;
    if (this.selectedFile) {
      this.fileName = this.selectedFile.name;
      this.uploadService.addSubmission(this.selectedFile).subscribe(resp => {
        alert("uploaded")
      });
      var response: Object[];

        this.uploadService.sentInfo(this.fileName, this.challenge_id, true, parseInt(localStorage.getItem('UID')), this.score).subscribe(resp => {
          alert("sent");
          this.uploadService.getSubmissionID(parseInt(localStorage.getItem('UID'))).subscribe((data: Object[]) => {
            response = data;
            var resp = JSON.stringify(response[0]);
            resp = resp.replaceAll(":", ",");
            resp = resp.replaceAll("}", ",");
            var splitResp = resp.split(",");
            this.uploadService.computeScore(parseInt(splitResp[1])).subscribe(resp => {
            });

            alert("computed");
        });

      }); 
      
    } else {
      alert("Please select a file first");
    }
  }
}

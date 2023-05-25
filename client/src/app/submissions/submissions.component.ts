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
      })

      this.uploadService.computeScore(this.fileName, this.challenge_id).subscribe(resp => {
        alert("computed")
      })

      this.uploadService.sentInfo(this.fileName, this.challenge_id, true, this.user_id, this.score).subscribe(resp => {
        alert("sent")
      })
      
    } else {
      alert("Please select a file first")
    }
  }
}

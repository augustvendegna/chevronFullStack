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
  public is_public: boolean;
  public challenge_id: number;
  fileName = '';

  /*
  shortLink: string = "";
  loading: boolean = false;
  selectedFile: File = null;
  */

  constructor(private uploadService: UploadService) {}

  // ngOnInit(): void {}

  onFileChange(event: any) {
    console.log(event.target.files[0])
	  this.selectedFile = event.target.files[0];
  }

  submitForm() {
    if (this.selectedFile) {
      this.fileName = this.selectedFile.name;
      this.uploadService.addSubmission(this.selectedFile).subscribe(resp => {
        alert("Uploaded")
      })
      this.uploadService.sentInfo(this.fileName, this.challenge_id, true).subscribe(resp => {
        alert("Sent")
      })
    } else {
      alert("Please select a file first")
    }

    /*
    this.loading = !this.loading;
    console.log(this.selectedFile);
    this.uploadService.addSubmission(this.selectedFile).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
          this.shortLink = event.link;
          this.loading = false;
        }
      }
    )
    */

    /*
	  if (this.selectedFile) {
		  const formData = new FormData();
		  formData.append('file', this.selectedFile);

      this.valueService.addSubmission(this.selectedFile, this.challenge_id, true)?.subscribe(_ => {
        this.login();
      });

      this.router.navigate(["/submissions"]);
    

      const upload$ = this.http.post('http://localhost:5000/addSubmissions', formData);
      upload$.subscribe();

	   // NOTES FOR SELF:
	   // Make an HTTP request to submit the file? HttpClient?
           this.http.post(' ', formData).subscribe(() => {
          // 	// File submitted successfully
	   // });
    }
    */
  }
}

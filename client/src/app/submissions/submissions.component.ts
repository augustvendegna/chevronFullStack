import { Component } from '@angular/core';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent {
  public selectedFile: File;

  onFileChange(event: any) {
	 this.selectedFile = event.target.files[0];
  }

  submitForm() {
	  if (this.selectedFile) {
		  const formData = new FormData();
		  formData.append('file', this.selectedFile);

	  // NOTES FOR SELF:
	  // Make an HTTP request to submit the file? HttpClient?
          // this.http.post(' ', formData).subscribe(() => {
          // 	// File submitted successfully
	  // });
          }
  }
}

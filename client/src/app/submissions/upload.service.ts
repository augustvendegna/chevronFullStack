import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) { }

  configUrl = 'http://localhost:5000';
  
  addSubmission(selectedFile:File){
    let formParams = new FormData();
    formParams.append('file', selectedFile, selectedFile.name)
    return this.httpClient.post(`${this.configUrl}/addSubmission`, formParams)
    .pipe(
      catchError(err => { return this.handleError(err) })
    );
  }

  sentInfo(fileName:string, challenge_id:number, is_public:boolean, user_id:number, score:number){
    now: String;
    const now = formatDate(new Date());
    return this.httpClient.post(`${this.configUrl}/addSubmissionInfo`, { fileName, now, challenge_id, is_public, user_id, score})
    .pipe(
      catchError(err => { return this.handleError(err) })
    );
  }

  createNewChallenge(answerKey:File, description:string, sampleData:File){
    let formParams = new FormData();
    formParams.append('file', answerKey, answerKey.name); // this only does the answerKey
    return this.httpClient.post(`${this.configUrl}/addChallengeKey`, formParams)
    .pipe(
      catchError(err => { return this.handleError(err) })
    );

  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

function formatDate(date: Date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}


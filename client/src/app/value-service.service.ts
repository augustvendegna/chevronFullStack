import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValueServiceService {

  constructor(private http: HttpClient) { }

  configUrl = 'http://localhost:5000';

  addUser(first:string, last:string, email:string, password:string, is_enabled:boolean, is_admin:boolean){
    now: String;
    const now = formatDate(new Date());
    return this.http.post(`${this.configUrl}/addUser`, { first, last, email, password, now, is_enabled, is_admin})
    .pipe(
      catchError(err => { return this.handleError(err) })
    );

  }
/*
  addSubmission(selectedFile:File, challenge_id:number, is_public:boolean){
    now: String;
    const now = formatDate(new Date());
    return this.http.post(`${this.configUrl}/addSubmission`, { selectedFile, now, challenge_id, is_public})
    .pipe(
      catchError(err => { return this.handleError(err) })
    );

  }
*/
  getUser(email:string, password:string){
    result:Array<Object>; 
    let params = new HttpParams();
    params = params.append('email', email);
    params = params.append('password', password);
    return this.http.get<Object[]>(`${this.configUrl}/getUser`, {params: params});
    // result.subscribe();
    //console.log(result);
    //result.unsubscribe();

  }

  getTargetUserInfo(email:string){
    result:Array<Object>; 
    let params = new HttpParams();
    params = params.append('email', email);
    return this.http.get<Object[]>(`${this.configUrl}/getTargetUserInfo`, {params: params});
    // result.subscribe();
    //console.log(result);
    //result.unsubscribe();

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
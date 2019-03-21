import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL: string = environment.api_endpoint;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtaHRfaWQiOiI0NTQ1NDEiLCJpYXQiOjE1NDg1MjEwMzd9.KTONE18OpbCcjsMHT5saLjlvp7_axZb1_ludjLDHoJo'
    })
  };

  constructor(private http: HttpClient) { }

  public getLevels(): Observable<any> {
    return this.http.get(this.API_URL + '/admin/question?quiz_type=BONUS', this.httpOptions).pipe(map(this.extractData));
  }
  
  public getUsers(): Observable<any> {
    return this.http.get(this.API_URL + '/users', this.httpOptions).pipe(map(this.extractData));
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}

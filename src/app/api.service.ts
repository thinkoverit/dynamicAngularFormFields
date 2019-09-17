import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { throwError as observableThrowError, Observable, Subject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {


  private actionSource = new Subject<any>();
  currentAction = this.actionSource.asObservable();
  commonStrings: any;


  constructor(public http: HttpClient) {

  }

  getApi(url, params, headers) {

    if (!headers || !headers['Content-Type']) {
      headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    }

    return new Promise((resolve, reject) => {
      this.http.get(url, { params: params, headers: headers })
        .pipe(map(res => res as {}), catchError(this.handleError([])))
        .subscribe(res => {
          resolve(res);
        }, error => {
          reject(this.commonStrings.http_error);
        });
    });
  }

  postApiCancellable(url, data, headers) {
    if (!headers || !headers.get('Content-Type')) {
      headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    }

    return this.http.get(url, { params: data, headers: headers })
      .pipe(map(res => res as {}), catchError(this.handleError([])));

  }
  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(error.error);
    };
  }
}

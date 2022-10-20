import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'http://localhost:4747/api';

  constructor(private http: HttpClient) {}
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  getPoints(): Observable<any> {   
    console.log(this.apiUrl + '/getRanking');
    return this.http.get(this.apiUrl + '/getRanking').pipe(retry(1), catchError(this.errorHandl));      
  }

  login(name:string, password:string): Observable<any> {
    const headers = { 'content-type': 'application/json', 'authorization': password};      
    var body = "";

    return this.http.post(this.apiUrl + '/' + name + '/login', body, {'headers':headers});
  }

  // Error handling
  errorHandl(error : ErrorEvent) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {   
      errorMessage = error.error.message; // Client-side error
    }

    if (!environment.production) {
      console.log(errorMessage);
    }
    
    return throwError(() => {
      return errorMessage;
    });
  }
}

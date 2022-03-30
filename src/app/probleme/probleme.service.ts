import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ITypeProbleme } from './probleme';
import { catchError, tap } from 'rxjs/operators';
import { IProbleme } from './problemedata';

@Injectable({
  providedIn: 'root'
})
export class ProblemeService {

  private baseUrl = 'https://localhost:7269/Intervention';
  constructor(private http: HttpClient) { }

  saveProbleme(probleme: IProbleme): Observable<IProbleme> {
    return this.createProbleme(probleme);
  }
  
 /** POST: add a new problem to the server */
private createProbleme(probleme: IProbleme): Observable<IProbleme> {
  return this.http.post<IProbleme>(this.baseUrl, probleme, this.httpOptions).pipe(
    tap((probleme: IProbleme) => console.log('added problem w/ id=${probleme.id}')),
    catchError(this.handleError)
  );
}

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
obtenirTypesProbleme(): Observable<ITypeProbleme[]> {
  return this.http.get<ITypeProbleme[]>(this.baseUrl).pipe(
      tap(data => console.log('obtenirTypesProbleme: ' + JSON.stringify(data))),
      catchError(this.handleError)
  );
}
private handleError(err: HttpErrorResponse) {
  // in a real world app, we may send the server to some remote logging infrastructure
  // instead of just logging it to the console
  let errorMessage = '';
  if (err.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    errorMessage = `An error occurred: ${err.error.message}`;
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
  }
  console.error(errorMessage);
  return throwError(errorMessage);
}

    


}

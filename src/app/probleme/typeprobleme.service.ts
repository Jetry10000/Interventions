import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ITypeProbleme } from './typeprobleme';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TypeProblemeService {

  private baseUrl = 'https://localhost:7269/Intervention';
  constructor(private _http: HttpClient) { }

    obtenirTypesProbleme(): Observable<ITypeProbleme[]> {
    return this._http.get<ITypeProbleme[]>(this.baseUrl).pipe(
      tap(data => console.log('obtenirTypesProbleme: ' + JSON.stringify(data))),
      catchError(this.handleError)
  );
}
private handleError(err: HttpErrorResponse) {
  // in a real world app, we may send the server to some remote logging infrastructure
  // instead of just logging it to the console
  console.error(err.message);
  //return Observable.throw(err.message);
  return throwError(err.message);
}
}

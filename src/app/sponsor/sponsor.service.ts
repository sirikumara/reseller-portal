import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Observer, of, throwError } from 'rxjs';
import { Sponsor } from './sponsor';

@Injectable({
  providedIn: 'root'
})
export class SponsorService {

  constructor(private httpClient: HttpClient) { }

  getSponsorList(): Sponsor[] {

    const res = this.httpClient.get<Sponsor[]>('http://localhost:8081/sponsor');

    let list: Sponsor[] = new Array();
    res.subscribe(data => {
      data.forEach(row => {
        list.push({
          id: row.id,
          name: row.name,
          companyName: row.companyName,
          companyRegCode: row.companyRegCode,
          city: row.city
        });
      });
    });

    return list;
  }

  save(sponsor: Sponsor): any {
    return this.httpClient.post<Sponsor>(
      'http://localhost:8081/sponsor',
      {
        name: sponsor.name,
        companyName: sponsor.companyName,
        companyRegCode: sponsor.companyRegCode,
        requestId: "req1"
      }).pipe(catchError(this.handelError));
  }

  handelError(error: HttpErrorResponse): Observable<any> {
    return throwError(() => new Error(error.status));
  }
}

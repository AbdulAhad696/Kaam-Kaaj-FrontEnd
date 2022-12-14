import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }
  reserve(reservation:any){
    return this.http.post(environment.baseUrl+'/contactus',reservation);
  }
}

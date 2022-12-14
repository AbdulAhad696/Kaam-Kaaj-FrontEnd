import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "./../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService {
  constructor(private http: HttpClient) { }

  fetchingServiceProviders(service: any) {
    return (this.http.get(`${environment.baseUrl}/serviceproviders/${service}`))
  }
  fetchSPData(email: any) {
    return (this.http.get(`${environment.baseUrl}/serviceprovider/profile/${email}`))
  }


}

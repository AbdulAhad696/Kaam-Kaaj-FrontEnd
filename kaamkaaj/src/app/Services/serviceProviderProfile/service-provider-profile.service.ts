import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "./../../../environments/environment";
import { SpinnerComponent } from 'src/app/Shared/spinner/spinner.component';
import { SpinnerService } from '../spinner/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderProfileService {
  constructor(private http: HttpClient) { }

  fetchingServiceProviderProfile(email: any) {
    return (this.http.get(`${environment.baseUrl}/serviceprovider/profile/${email}`))
  }
  updateServiceProviderProfile(editedData: any) {
    return (this.http.put(`${environment.baseUrl}/serviceprovider/profile/updateProfile`, editedData))
  }
  deletePortfolioImage(email: string, image: any) {
    let info = { email: email, image: image }
    return (this.http.put(`${environment.baseUrl}/serviceprovider/profile/updateProfile/deleteImage`, info))
  }
  uploadPortfolioImage(info: any) {
    return (this.http.put(`${environment.baseUrl}/serviceprovider/profile/updateProfile/uploadImage`, info))
  }
  fetchReviews(email: any) {
    return (this.http.get(`${environment.baseUrl}/serviceprovider/profile/reviews/${email}`))
  }
  toggleProfileStatus(data: any) {
    console.log(`${environment.baseUrl}/serviceprovider/profile/sp/status-update`)
    return (this.http.patch(`${environment.baseUrl}/serviceprovider/profile/sp/status-update`, data))
  }
















}





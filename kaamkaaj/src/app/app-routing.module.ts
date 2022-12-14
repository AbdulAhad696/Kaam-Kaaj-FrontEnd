import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerLandingPageComponent } from './UserSite/customer-landing-page/customer-landing-page.component';
import { ServiceProvidersComponent } from './UserSite/service-providers/service-providers.component';
import { FilterBarComponent } from './UserSite/filter-bar/filter-bar.component';
import { SignUpComponent } from './main-app/sign-up/sign-up.component';
import { SignInComponent } from './main-app/sign-in/sign-in.component';
import { MainPageComponent } from './main-app/main-page/main-page.component';
import { ContactUsComponent } from './Shared/contact-us/contact-us.component';
import { AboutUsComponent } from './main-app/about-us/about-us.component';
import { SpDashboardComponent } from './service-provider/pages/sp-dashboard/sp-dashboard.component';
import { ServiceComponent } from './UserSite/service/service.component';
import { AuthenticationGuard } from './auth-guards/authentication.guard';
import { AdminGuardGuard } from './auth-guards/admin-guard.guard';
import { ClientGuardGuard } from './auth-guards/client-guard.guard';
import { ServiceProviderProfileComponent } from './service-provider/pages/service-provider-profile/service-provider-profile.component';
import { CategoryGuardGuard } from './auth-guards/category-guard.guard';
import { SpViewjobsComponent } from './service-provider/pages/sp-viewjobs/sp-viewjobs.component';
import { ServiceprovidermainComponent } from './service-provider/pages/serviceprovidermain/serviceprovidermain.component';
import { JobGigsComponent } from './UserSite/job-gigs/job-gigs.component';
import { CustomermainpageComponent } from './UserSite/customermainpage/customermainpage.component';
import { MyProjectsComponent } from './service-provider/pages/my-projects/my-projects.component';
import { BidingsComponent } from './UserSite/bidings/bidings.component';
import { RunningJobsComponent } from './UserSite/running-jobs/running-jobs.component';
import { PostedJobsComponent } from './UserSite/posted-jobs/posted-jobs.component';
import { ClientProjectsComponent } from './UserSite/client-projects/client-projects.component';
import { ChangePasswordConponentComponent } from './UserSite/change-password-conponent/change-password-conponent.component';
import { AdminDashboardComponent } from './admin/pages/admin-dashboard/admin-dashboard.component';
import { AdminMainComponent } from './admin/pages/admin-main/admin-main.component';
import { WalletComponent } from './Shared/wallet/wallet.component';
import { ComplaintsComponent } from './admin/pages/complaints/complaints.component';
import { CategoriesComponent } from './admin/pages/categories/categories.component';


const routes: Routes = [
  // Main page, Sign In, Sign up Components routing
  
  

  {
    path: 'customer-mainpage',
    canActivate: [ClientGuardGuard],
    component: CustomermainpageComponent,
    children: [
      
      { path: 'jobgigs', component: JobGigsComponent },
      { path: 'jobgigs/:category/:id', component: JobGigsComponent },
      { path: 'contactadmin', component: ContactUsComponent },
      { path: 'serviceproviders/:service', component: FilterBarComponent },
      { path: 'serviceprovider/profile/:email', component: ServiceProviderProfileComponent },
      { path: 'jobs', component: PostedJobsComponent },
      { path: 'jobs/bids/:id', component: BidingsComponent },
      { path: 'running', component: RunningJobsComponent },
      { path: 'myprojects', component: ClientProjectsComponent },
      { path: '', component: CustomerLandingPageComponent },
    ]
  },

  {
    path: 'admin', component: AdminMainComponent,
    canActivate: [AdminGuardGuard],
    children: [
      {path:  'complaints', component: ComplaintsComponent},
      { path: 'wallet', component: WalletComponent },
      { path: 'serviceproviders/:service', component: FilterBarComponent },
      { path: 'serviceprovider/profile/:email', component: ServiceProviderProfileComponent },
      { path: '', component: CategoriesComponent },


    ]
  },
  


  {
    path: 'service-provider',
    canActivate: [AuthenticationGuard],
    component: ServiceprovidermainComponent,
    children: [
      
    { path: 'viewjobs', canActivate: [CategoryGuardGuard], component: SpViewjobsComponent },
    { path: 'contactadmin', canActivate: [CategoryGuardGuard], component: ContactUsComponent },
    { path: 'profile/:email', component: ServiceProviderProfileComponent },
    { path: 'myprojects', canActivate: [CategoryGuardGuard], component: MyProjectsComponent },
    { path: 'wallet', canActivate: [CategoryGuardGuard], component: WalletComponent },
    { path: '', canActivate: [CategoryGuardGuard], component: SpDashboardComponent },]
  },
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'changepassword/:id', component: ChangePasswordConponentComponent },
  { path: '', component: MainPageComponent },
  { path: 'contactus', component: ContactUsComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'services', component: ServiceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingcomponents = [SignUpComponent,
  SignInComponent,
  MainPageComponent,
  ContactUsComponent,
  AboutUsComponent,
  SpDashboardComponent,
  SpViewjobsComponent,
]

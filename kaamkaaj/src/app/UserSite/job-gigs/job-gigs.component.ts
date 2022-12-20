import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AddJobService } from 'src/app/Services/add-job/add-job.service';
import { SignInService } from 'src/app/Services/sign-in/sign-in.service';
import { SpinnerService } from 'src/app/Services/spinner/spinner.service';
import { GetServicesService } from '../../Services/get-services/get-services.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient,HttpParams} from '@angular/common/http';
import { Router ,ActivatedRoute } from '@angular/router';
// import { ActivatedRoute, Router } from '@angular/router';
import { ViewChild,ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-job-gigs',
  templateUrl: './job-gigs.component.html',
  styleUrls: ['./job-gigs.component.css']
  
})
export class JobGigsComponent implements OnInit {
  @ViewChild('fileUploader') fileUploader:ElementRef;
  @ViewChild("amountNumberField") amountNumberField;
  @ViewChild("durationNumberField") durationNumberField;

  constructor( private GetServicesService:GetServicesService , private AddJobService:AddJobService , private SignInService:SignInService , private SpinnerService: SpinnerService , private http: HttpClient  , private route: ActivatedRoute , private datePipe:DatePipe,  @Inject(DOCUMENT) document: Document ,private router:Router) { }
  // constructor( private GetServicesService:GetServicesService , private AddJobService:AddJobService , private SignInService:SignInService , private SpinnerService: SpinnerService , private http: HttpClient  , private route: ActivatedRoute , private datePipe:DatePipe,  @Inject(DOCUMENT) document: Document,private router: Router ) { }
// -----------------------variable required--------------------------
  allServices: any;
  jobData:any;
  isJobAdded:any;
  selectedServiceObject:any;
  currentCategory="Choose Category";
  currentAmount = "Choose Amount";
  currentDuration = "Choose Duration";
  currentServiceProviderCategory:any;
  btnState:boolean = false;
  amountText:any;
  categoryText:any;
  successmsg="Job was added successfully"
  failmsg = "Failed to add job"
  success:any
// -----------------------------schema variables-------------------------
  title:string;
  jobPostDate:string;
  description:string;
  estAmount:number;
  gigPics:any;
  // spRating:number;
  status:string;
  jobAddress:string;
  estCompletionTime:Date;
  category:any
  jobAssignedTo:any;
  jobAssignedBy:any;
  // jobDescription:"";
  // clientAddress:"";

  // ----------------------------posting job-----------------------
  async addingJob(job:any){
    if(await lastValueFrom( this.AddJobService.postJobApi(job) )){
      this.success=true
    }
    else{
      this.success=false

    }
  }

  // ------------------------geting selected service -----------------
  async currentService(currentService:string){
    this.selectedServiceObject =await lastValueFrom(this.AddJobService.getSpecificJob(currentService))
    this.category = this.selectedServiceObject[0]._id;
    this.currentCategory = currentService;
  }

  // ----------------------------getting selected amount--------------------
  gettingAmount(amount:number){
    this.estAmount = amount;
    this.currentAmount = String(amount);
  }

// -----------------------------------form submission--------------------------
async handleSubmit(){
    const now = Date.now();
    const myFormattedDate = this.datePipe.transform(now, 'short');
    this.jobData = {
      title:this.title,
      jobPostDate:myFormattedDate,
      description:this.description,
      estAmount:this.estAmount,
      status:"punched",
      jobAddress:this.jobAddress,
      estCompletionTime:(this.estCompletionTime),
      category:this.category,
      jobAssignedBy:this.jobAssignedBy,
      gigPics: this.gigPics,
      jobAssignedTo: this.jobAssignedTo
    }
    
    
    ///////////////////////////////////
    this.gigPics =await lastValueFrom(this.onMultipleSubmittingImages());
    this.SpinnerService.requestStarted();
    setTimeout(() => {
      this.SpinnerService.requestEnded()
    }, 2000)
    await this.addingJob(this.jobData);
    
    setTimeout(()=>{
      alert(this.isJobAdded);
    },10)



    setTimeout(() => {
      if (this.success == true) {
        this.success = null;
      }
      this.success = null;
    }, 5000);
    setTimeout(() => {
      this.router.navigate(["customer-mainpage"])
    }, 4000);



    this.refreshComponent()
  }

// ------------------------refresing a specific component ----------------------
  refreshComponent(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'] , { relativeTo: this.route } )

  }

  // --------------------------getting all services-----------------------------
  async gettingServices(){
    this.allServices = await lastValueFrom(this.GetServicesService.fetchingServices());
  }

  // ----------------------------converting amount dropdown to input field------------------
  amountToogle(){
    document.getElementById("amountdropdown")?.classList.add("hide");
    document.getElementById("amountFields")?.classList.remove("hide");
    this.amountNumberField.nativeElement.focus();
    // ------------removing validation from amount dropdown-----------
    this.amountText = "a";
  }

// ----------------------------converting duration dropdown to input field-----------------------
  timeToogle(){
    document.getElementById("Durationdropdown")?.classList.add("hide");
    document.getElementById("DurationFields")?.classList.remove("hide");
    this.durationNumberField.nativeElement.focus();
  }
  
// -----------------------------uploading  images----------------------------
  selectMultipleImages(event){
    if(event.target.files.length > 0){
      this.gigPics = event.target.files;
    }
  }
  onMultipleSubmittingImages(){
    const formData = new FormData();
    if(this.gigPics != null){
      for(let img of this.gigPics){
        formData.append('files',img)
      }
    }
    return this.http.post<any>(`${environment.baseUrl}/addJobs/multipleImages` , formData)  }
  // ----------------getting current date--------------------
    gettingCurrentDate(){
      var dtToday = new Date();
      var month = dtToday.getMonth() + 1;
      var day = dtToday.getDate();
      var year = dtToday.getFullYear();
      if(month < 10){
        month = Number('0' + month.toString());
      }
      if(day < 10){
        day = Number('0' + day.toString());
      }
      var currentDate= year + '-' + month + '-' + day;
      (<HTMLInputElement>document.getElementById('date')).min = currentDate;
    }
    // -------------------removing validation from select amount dropdown----------
    removingValidationAmountDropdown(){
      document.getElementById("amountDropdownDivId")?.classList.add("hide");
      this.amountText = "a";
    }
    // -------------------removing validation from select category dropdown----------
    removingValidationCategoryDropdown(){
      document.getElementById("categoryDropdownDivId")?.classList.add("hide");
      this.categoryText = "a";
    }
    
  ngOnInit(): void {
    this.gettingCurrentDate()
    this.gettingServices();
    this.jobAssignedBy = this.SignInService.getId()
// ------------------------showing category of specific service provider-----------------------------
    this.currentServiceProviderCategory = this.route.snapshot.paramMap.get('category');
    this.jobAssignedTo = this.route.snapshot.paramMap.get('id');
    if(typeof(this.currentServiceProviderCategory) == "string"){
      this.currentCategory = this.currentServiceProviderCategory;
      this.currentService(this.currentServiceProviderCategory)
      this.btnState = true;
      // ------------removing validation from category dropdown-----------
      this.categoryText = "a";
    }
  }
}
  
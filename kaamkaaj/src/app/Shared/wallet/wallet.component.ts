import { Component, OnInit } from '@angular/core';
import { ServiceProviderService } from 'src/app/Services/serviceProvider/service-provider.service';
import { SignInService } from 'src/app/Services/sign-in/sign-in.service';
import { lastValueFrom } from "rxjs"
import { Router } from '@angular/router';


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  balance = 0
  revenue = 0
  userType = this.signiService.getusertype()
  income = 0
  selectedBtn = "Balance"
  constructor(private spData: ServiceProviderService, private signiService: SignInService,public router: Router) { }

  async getBalance() {
    var bal = (await lastValueFrom(this.spData.fetchSPData(this.signiService.getemail())))
    console.log(bal)
    this.balance = bal[0]?.serviceProviderDetails[0]?.balance || 0
    this.income = bal[0]?.totalEarning || bal[0]?.serviceProviderDetails[0]?.totalEarning || 0
    console.log(this.balance, "Balance")
    console.log(this.income, "Income")

  }
  ngOnInit(): void {
    this.getBalance()
    // console.log(spdata)
  }
  

  
  transactionBtnClick() {
    this.selectedBtn = "Transaction"
  }
  balanceBtnClick() {
    this.selectedBtn = "Balance"
  }

}

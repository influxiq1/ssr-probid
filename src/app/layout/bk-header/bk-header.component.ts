import { Component, OnInit, Inject  } from '@angular/core';
import { BkLeftdivComponent } from '../../../app/layout/bk-leftdiv/bk-leftdiv.component';
import { SidenavService } from '../../../app/services/sidenav.service';

import {MatDialog} from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from '../../api.service';
import { HttpClient } from '@angular/common/http';
// import { WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'app-bk-header',
  templateUrl: './bk-header.component.html',
  styleUrls: ['./bk-header.component.css']
})
export class BkHeaderComponent implements OnInit {
  public userCookies: any;
  public userid: any = '';

  public type: any;
  public recphoneno: any;
  public recid: any;
  public sourceval = 'rep_recruiter_view';
  public sourceconditionval: any;
  public datalist: any;
  public allresourcecategory: any;
  public idis: any;
  public repdetails: any;
  public reptraininglessondetails: any;
  public consultantrole: any;
  public interval;
  public repDetailsNew: any = [];
  public videoCategoryarry: any = [];
  public checkOldCookie: any;
  public oldcookiedata: any;
  public gameplanButton:any = 0;
  public calenderaccess:any;
  public user_full_name: any;



  public user_details: any = '';   
  public user_data: any;
  public profile_img: any = '';
  constructor(
    public cookieService: CookieService,
     private sidenav: SidenavService,
      public dialog: MatDialog,
       public router: Router,
        public Header: HeaderComponent,
    // @Inject(WINDOW) public window: Window,
      private ApiService: ApiService,
       private _http: HttpClient
    ) {
      this.getrepdetails();

  }
  toggleActive:boolean = false;
  toggleRightSidenav() {
    this.toggleActive = !this.toggleActive;
    this.sidenav.toggle();
    // console.log('Clicked');
    
    
    
   }
   open(val){
     
   }
   logout() {
    this.cookieService.deleteAll('/');
    setTimeout(()=>{
        // console.log(this.cookieService.get('userid'));s
        this.router.navigate(['/']);
    },500);

    // setTimeout(() => {
    //   this.cookieService.deleteAll();

    // }, 1000);
    // if (this.cookieService.get('jwtToken') != '') {
    //   this.router.navigateByUrl('/');
    // }
    // console.log("logout");
   }

   myAccount() {
    this.router.navigateByUrl('/my-account');
   }

   getrepdetails() {
    // const link = this.ApiService.nodesslurl + 'getrecvalues?token=' + this.cookie.get('jwtToken');
    // var data = { _id: this.cookie.get('userid') }

    // let value: any = {"source":"traininglesson"}

    // this.ApiService.getDataForDatalist(value).subscribe(res =>{

    //   let result: any;
    //     result = res;
    //     if (result.status == 'error') {
    //     } else {
    //       this.repdetails = result.res;
    //       this.reptraininglessondetails = result.res;
    //       /*console.log('this.repdetails');
    //       console.log(this.repdetails);*/
    //       /* console.log('this.reptraininglessondetails');
    //        console.log(this.reptraininglessondetails);*/
    //     }
    //   }, error => {
    //     console.log('Oooops!');
    // })

    
    // this._http.post(link, data)
    //   .subscribe(res => {
    //     let result: any;
    //     result = res;
    //     if (result.status == 'error') {
    //     } else {
    //       this.repdetails = result.res;
    //       this.reptraininglessondetails = result.res2;
    //       /*console.log('this.repdetails');
    //       console.log(this.repdetails);*/
    //       /* console.log('this.reptraininglessondetails');
    //        console.log(this.reptraininglessondetails);*/
    //     }
    //   }, error => {
    //     console.log('Oooops!');
    //   });
  }

  //  gototrainingsectionwithcat() {
  //   if (this.reptraininglessondetails != null) {
  //     var link = 'reptrainingcenter/' + this.reptraininglessondetails.trainingcategory;
  //     console.log('link')
  //     console.log(link)
  //     this.router.navigate([link]);
  //   } else {
  //     var link = 'reptrainingcenter/5da46c324b1928253fdb5d2e';
  //     this.router.navigate([link]);
  //   }
  // }

  gototrainingsectionwithcat(){
    
  }

   gotoHome(){
    //  console.log('ok')
     this.router.navigateByUrl('/home');
   }

  ngOnInit() {
    if (this.cookieService.get('user_details') != undefined && this.cookieService.get('user_details') != null && this.cookieService.get('user_details') != '') {
      this.userCookies = JSON.parse(this.cookieService.get('user_details'));
      this.user_full_name = this.userCookies.firstname + ' '+ this.userCookies.lastname ;
      if (this.userCookies.profile_picture != null) {
        this.profile_img = this.userCookies.profile_picture[0].basepath +''+this.userCookies.profile_picture[0].fileservername;
      }
    }
  }



}


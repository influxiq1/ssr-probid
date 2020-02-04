import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { FacebookService, LoginResponse, UIParams, UIResponse } from 'ngx-facebook';
import { MetaService } from '@ngx-meta/core';
import { MatSort } from '@angular/material/sort';
import { DomSanitizer } from '@angular/platform-browser';

export interface DialogData1 {
  data: any;
  topPart: any;
  flag: any;
  heading: string;
  added_by_fullname: string;
  added_for_fullname: string;
  highest_bid: string;
}



export interface DialogData {
  data: any;
  msg: any;
}
export class socialFacebookAdvos {
  Id: String;
  title_name: String;
  image_URL: String;
}

export class socialLinkedinAdvos {
  Id: String;
  title_name: String;
  image_URL: String;
}




@Component({
  selector: 'app-maindashboard',
  templateUrl: './maindashboard.component.html',
  styleUrls: ['./maindashboard.component.css']
})
export class MaindashboardComponent implements OnInit {



  public indexval: any = 6;
  public indexValForLinkdin: any = 6;
  public errorApiKey: any;

  public allFacebookBanner: any = [
    'facebookbanner-img1.jpg', 'facebookbanner-img2.jpg', 'facebookbanner-img3.jpg', 'facebookbanner-img4.jpg', 'facebookbanner-img5.jpg', 'facebookbanner-img6.jpg'];
  public allLinkdinBanner: any = [
    'linkedinbanner-img1.jpg', 'linkedinbanner-img2.jpg', 'linkedinbanner-img3.jpg', 'linkedinbanner-img4.jpg', 'linkedinbanner-img5.jpg', 'linkedinbanner-img6.jpg'];





  public apikeyForm: FormGroup;


  public message: any = "Are you sure you want to delete this?"

  // public static: any; 
  public userCookies: any;
  public user_full_name: any = '';


  public rsvp_list: any = '';
  public saveSearch_list: any = '';
  public ststus: number;


  public rsvpIndex: any = 3;
  public saveSearchIndex: any = 10;

  public socialadvoFBIndex: any = 6;
  public socialadvoLDIndex: any = 6;





  public errorMsg: string = '';
  public stateList: any;
  public inventory_search_list: any;
  public make_list: any;
  public type_list: any;
  public model_list: any;
  public year_list: any;
  public type: string = '';
  public year: string = '';
  public make: string = '';
  public model: string = '';
  public vin: string = '';
  public trim: string = '';
  public vehicle: string = '';
  public state: string = '';
  public zip: string = '';
  public search: any;
  public user_details: any;
  public user_id: string = '';
  public modalImg: string = '';
  public isFavorite: number = 0;
  public customerList: any = '';
  public customur_id: any = '';
  public crsvplist: any = '';
  public count: any = '';
  public jobTicketList: any;
  public jobTicketDataList: any;
  public jobLength: any;
  public filterVal: any;
  public filterValstatus: any = '';


  @ViewChild(FormGroupDirective, { static: false }) formDirective: FormGroupDirective;
  constructor(public cookieService: CookieService,
    public activatedRoute: ActivatedRoute,
    public apiService: ApiService,
    public http: HttpClient,
    public dialog: MatDialog,
    public snack: MatSnackBar,
    public router: Router,
    public fb: FormBuilder,
    private facebook: FacebookService,
    private readonly meta: MetaService) {

    this.meta.setTitle('ProBid Auto - Admin Dashboard!');
    this.meta.setTag('og:title', 'ProBid Auto - Admin Dashboard');
    this.meta.setTag('twitter:title', 'ProBid Auto - Admin Dashboard');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', '../../assets/images/logomain.png');
    this.meta.setTag('twitter:image', '../../assets/images/logomain.png');
    this.userCookies = JSON.parse(this.cookieService.get('user_details'));

    facebook.init({
      appId: '2540470256228526',
      version: 'v2.9'
    });

  }
  /* To copy Text from Textbox */
  copyMessage(val: string) {
    let url = this.apiService.share_link + 'customer-signup/' + val + '/' + this.userCookies._id;
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = url;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.snack.open('Url Copied on clipboard', 'ok', {
      duration: 2000
    })

  }




  ngOnInit() {
    this.activatedRoute.data.forEach((data: any) => {
      this.rsvp_list = data.rsvp.result.currentRsvp;
      this.saveSearch_list = data.rsvp.result.save_search;
      this.count = data.rsvp.result;
    });
    this.generateForm();

    //for job ticket

    let data: any;
    data = {
      "source": "job_ticket_customer"
    }
    this.apiService.CustomRequest(data, 'datalist').subscribe(res => {
      let result: any = res;
      this.jobTicketDataList = result.res;
      this.jobLength = result.resc;

      this.jobTicketList = new MatTableDataSource<JTElement>(this.jobTicketDataList);
      //  this.jobTicketList.paginator = this.paginator4;
      //  this.jobTicketList.sort = this.sort;
    })

  }

  login() {
    this.facebook.login()
      .then((res: LoginResponse) => {
        this.getProfile();
      })
      .catch();
  }
  getLoginStatus() {
    this.facebook.getLoginStatus()
      .then((res: any) => {

        this.getProfile();
      })
      .catch();
  }

  getProfile() {
    this.facebook.api('me/?fields=id,name,email,picture')
      .then((res: any) => {
        // this.profile = res;
      })
      .catch((error: any) => {

      });
  }

  logoutWithFacebook(): void {

    this.facebook.logout().then();
  }
  share(url: string) {
    var fullUrl = 'https://dev.probidauto.com/customer-signup/' + url + '/' + this.userCookies._id;
    this.cookieService.set('shareIngUrl', fullUrl);
    let params: UIParams = {
      href: fullUrl,
      method: 'share',
      quote: 'https://dev.probidauto.com/'
    };
    this.facebook.ui(params)
      .then((res: UIResponse) => {
      })
      .catch();
  }


  applyFilter(filterVal: any) {
    console.log(filterVal)
    this.jobTicketList.filter = filterVal.trim().toLowerCase();
  }

  viewDetails(item: any, status: any) {
    console.log(item)
    this.router.navigateByUrl('/manage-job-ticket/add/' + item.rsvp_id + '/' + status)
  }

  changeStatus(item: any, val: any) {
    let endpoint: any = "addorupdatedata";
    item.status = val;
    let card_data: any = {
      card_data: item,
      id: item._id
    }
    let data: any = {
      data: card_data,
      source: "send_for_rsvp",
    };
    this.apiService.CustomRequest(data, endpoint).subscribe((res: any) => {
      (res.status == "success");
    });
  }


  openModale(data: any) {
    // console.log(data)
    const dialogRef = this.dialog.open(askForconfirmationDialogComponent, {

      data: data

    });
    dialogRef.afterClosed().subscribe((result: any) => {
      // console.log(result);

      let carData: any = {
        vehicle: result.heading,
        salesrep: result.added_by_fullname,
        customer: result.added_for_fullname,
        salesrep_email: result.added_by_email,
        customer_email: result.added_for_email,
        topPart: result.topPart,
        highest_bid: result.highest_bid,
        status: 3

      }

      if (result.flag == 'yes') {

        let endpoint: any = "addorupdatedatawithouttoken";

        let data: any = {
          data: carData,
          source: "ask_for_confirmation",
        };
        this.apiService.CustomRequest(data, endpoint).subscribe((res: any) => {
          (res.status == "success");
          // console.log(res)
        });
      } else {
        // console.log('No..!')
      }

    });
  }

  generateForm() {
    this.apikeyForm = this.fb.group({
      apikey: ['', Validators.required],
      keynum: ['', Validators.required]
    })
  }

  //for new apikey submit
  apiKeySubmit() {
    for (let x in this.apikeyForm.controls) {
      this.apikeyForm.controls[x].markAsTouched();
    }
    // console.log(this.apikeyForm.value.apikey.length)
    if (this.apikeyForm.valid) {
      this.errorApiKey = ''
      if (this.apikeyForm.value.apikey.length == 32) {

        // console.log('hit')
        let data: any;

        data = {
          no: this.apikeyForm.value.keynum,
          apikey: this.apikeyForm.value.apikey
        }


        this.apiService.CustomRequest(data, 'apiupdate').subscribe((res) => {
          let result: any;
          result = res

          if (result.status == 'success') {
            this.formDirective.resetForm();
            this.snack.open('Api Key Updated', 'ok', {
              duration: 2000
            })


          }
        })
      }
      else {
        this.errorApiKey = 'api key is not valid'
      }

    }

  }

  inputUntouched(val: any) {
    this.apikeyForm.controls[val].markAsUntouched();
  }

  deleteAny(val: any, index: any, flag: string) {
    const dialogRef = this.dialog.open(DeleteModalRsvpComponent, {
      width: '250px',
      data: this.message

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result == 'yes') {
        let data: any;
        if (flag == 'rsvp') {
          data = {
            source: "send_for_rsvp",
            id: val
          }
          this.apiService.CustomRequest(data, 'deletesingledata').subscribe((res) => {
            let result: any;
            result = res;

            if (result.status == 'success') {
              this.rsvp_list.splice(index, index + 1);
              this.snack.open('Record Deleted Successfully..!', 'Ok', { duration: 4000 })

            }
          })
        }
        else {
          data = {
            source: "save_favorite",
            id: val
          }
          this.apiService.CustomRequest(data, 'deletesingledata').subscribe((res) => {
            let result: any;
            result = res;
            // console.log('success',result)

            if (result.status == 'success') {
              this.saveSearch_list.splice(index, index + 1);
              this.snack.open('Record Deleted Successfully..!', 'Ok', { duration: 4000 })

            }
          })
        }
      }
    });
  }


  // loadMoreSearchResult(){
  //   this.socialadvoIndex=this.socialadvoIndex+2;
  // }


  //for save search details
  viewSaveDetails(val: any) {
    // console.log(val)
    this.router.navigateByUrl('/inventory-detail/' + val);
  }

  //for rsvp details
  viewRsvpDetails(val: any) {
    // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>test>>>>>>>>>>>>>>>>>>>>>>>>>>', val);
    this.router.navigateByUrl('/rsvp-detail/' + val);
  }

  //for view Job Ticket
  viewJobTicket(val: any) {
    this.router.navigateByUrl('/manage-job-ticket/' + val);
  }

  goToOpenTicket(item: any, status: any) {
    // console.log(item);
    this.router.navigateByUrl('/manage-job-ticket/add/' + item._id + '/' + status)
  }

  //delete JobTicket record
  deleteJobTicket(val: any, index: any) {
    console.log('delete hit', val, index)
    const dialogRef = this.dialog.open(DeleteJobTicketModalComponent, {

      data: this.message

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result == 'yes') {
        let data: any;
        data = {
          "source": "job_ticket",
          id: val
        }
        this.apiService.CustomRequest(data, 'deletesingledata').subscribe((res) => {
          let result: any;
          result = res;

          if (result.status == 'success') {
            this.jobTicketDataList = this.jobTicketDataList.filter(jobTicketDataList => jobTicketDataList._id != val)
            // this.jobTicketDataList.splice(index,1);
            this.jobTicketList = new MatTableDataSource<JTElement>(this.jobTicketDataList);

            this.snack.open('Record Deleted Successfully..!', 'Ok', { duration: 2000 })

          }
        })
      }
    });
  }



  private handleError(error) {
    // console.error('Error processing action', error);
  }


  //job ticket status filter
  statusFilterForJT(val: any) {
    console.log(val)

    let data: any;
    if (val != '') {
      data = {
        endpoint: 'datalist',
        source: "job_ticket_customer",
        condition: {
          "job_ticket_status": Number(val)
        }
      }
    }
    else {
      data = {
        endpoint: 'datalist',
        source: "job_ticket_customer"
      }
    }
    //  console.log(data)
    this.apiService.getDatalist(data).subscribe((res) => {
      let result: any
      result = res;
      this.jobTicketDataList = result.res;


      setTimeout(() => {
        this.jobTicketList = new MatTableDataSource<JTElement>(this.jobTicketDataList);

        this.jobTicketList.paginator = this.paginator4;

      }, 500);


    })

  }



  clear() {
    this.filterVal = '';
    this.filterValstatus = ''
    setTimeout(() => {
      this.jobTicketList = new MatTableDataSource<JTElement>(this.jobTicketDataList);
      this.jobTicketList.paginator = this.paginator4;
    }, 500);

  }






  displayedColumns = ['name', 'email', 'phoneNumber', 'trainingProgress', 'date_completed', 'status'];
  dataSource1 = new MatTableDataSource<TRElement>(TrainingReports_DATA);

  displayedColumns2 = ['name', 'email', 'phoneNumber', 'trainingProgress', 'date_completed', 'status'];
  dataSource2 = new MatTableDataSource<CRElement>(CommissionReports_DATA);

  displayedColumns3 = ['image_URL1', 'name', 'phoneNumber', 'date', 'repName', 'action'];
  dataSource3 = new MatTableDataSource<UAElement>(UA_DATA);

  displayedColumns4 = ['ticket', 'car_image', 'name', 'repName', 'customerName', 'date', 'subject', 'status', 'action'];
  // dataSource4 = new MatTableDataSource<JTElement>(JobTicket_DATA);


  @ViewChild('paginator', { static: false }) paginator: MatPaginator;
  @ViewChild('paginator2', { static: false }) paginator2: MatPaginator;
  @ViewChild('paginator3', { static: false }) paginator3: MatPaginator;
  @ViewChild('paginator4', { static: false }) paginator4: MatPaginator;


  ngAfterViewInit() {
    this.dataSource1.paginator = this.paginator;
    this.dataSource2.paginator = this.paginator2;
  }

  ngAfterViewInit1() {
    this.dataSource3.paginator = this.paginator3;
    this.jobTicketList.paginator = this.paginator4;
  }

  _setDataSource(indexNumber) {
    setTimeout(() => {
      switch (indexNumber) {
        case 0:
          !this.dataSource1.paginator ? this.dataSource1.paginator = this.paginator : null;
          break;
        case 1:
          !this.dataSource2.paginator ? this.dataSource2.paginator = this.paginator2 : null;
      }
    });
  }

  _setCommunicationDataSource(indexNumber) {
    setTimeout(() => {
      switch (indexNumber) {
        case 0:
          !this.dataSource3.paginator ? this.dataSource3.paginator = this.paginator3 : null;
          break;
        case 1:
          this.jobTicketList = new MatTableDataSource<JTElement>(this.jobTicketDataList);

          !this.jobTicketList.paginator ? this.jobTicketList.paginator = this.paginator4 : null;
      }
    });
  }

}


export interface TRElement {
  date_joined: string;
  name: string;
  email: string;
  phoneNumber: string;
  trainingProgress: string;
  date_completed: string;
  status: string;
}


export interface CRElement {
  date_joined: string;
  name: string;
  email: string;
  phoneNumber: string;
  trainingProgress: string;
  date_completed: string;
  status: string;
}


export interface UAElement {
  image_URL1: string;
  name: string;
  phoneNumber: string;
  date: string;
  repName: string;
  action: string;
}

export interface JTElement {
  ticket: string;
  // image_URL: string;
  car_image: string;
  name: string;
  title: string;
  repName: string;
  customerName: string;
  date: string;
  subject: string;
  status: string;
  action: string;
}




export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const TrainingReports_DATA: TRElement[] = [
  { date_joined: '11-09-2019', name: 'Lorem Ipsum', email: 'LoremIpsumis@gmail.com', phoneNumber: '1234567890', trainingProgress: '56 %', date_completed: '02-12-2019', status: 'complete' },
  { date_joined: '11-09-2019', name: 'Lorem Ipsum', email: 'LoremIpsumis@gmail.com', phoneNumber: '1234567890', trainingProgress: '56 %', date_completed: '02-12-2019', status: 'Incomplete' },
  { date_joined: '11-09-2019', name: 'Lorem Ipsum', email: 'LoremIpsumis@gmail.com', phoneNumber: '1234567890', trainingProgress: '56 %', date_completed: '02-12-2019', status: 'Incomplete' },
  { date_joined: '11-09-2019', name: 'Lorem Ipsum', email: 'LoremIpsumis@gmail.com', phoneNumber: '1234567890', trainingProgress: '56 %', date_completed: '02-12-2019', status: 'Incomplete' },
  { date_joined: '11-09-2019', name: 'Lorem Ipsum', email: 'LoremIpsumis@gmail.com', phoneNumber: '1234567890', trainingProgress: '56 %', date_completed: '02-12-2019', status: 'Incomplete' },
  { date_joined: '11-09-2019', name: 'Lorem Ipsum', email: 'LoremIpsumis@gmail.com', phoneNumber: '1234567890', trainingProgress: '56 %', date_completed: '02-12-2019', status: 'Incomplete' },
  { date_joined: '11-09-2019', name: 'Lorem Ipsum', email: 'LoremIpsumis@gmail.com', phoneNumber: '1234567890', trainingProgress: '56 %', date_completed: '02-12-2019', status: 'Incomplete' },
  { date_joined: '11-09-2019', name: 'Lorem Ipsum', email: 'LoremIpsumis@gmail.com', phoneNumber: '1234567890', trainingProgress: '56 %', date_completed: '02-12-2019', status: 'Incomplete' },
];


const CommissionReports_DATA: CRElement[] = [
  { date_joined: '11-09-2019', name: 'Lorem Ipsum', email: 'LoremIpsumis@gmail.com', phoneNumber: '1234567890', trainingProgress: '56 %', date_completed: '02-12-2019', status: 'complete' },
  { date_joined: '11-09-2019', name: 'Lorem Ipsum', email: 'LoremIpsumis@gmail.com', phoneNumber: '1234567890', trainingProgress: '56 %', date_completed: '02-12-2019', status: 'Incomplete' },
  { date_joined: '11-09-2019', name: 'Lorem Ipsum', email: 'LoremIpsumis@gmail.com', phoneNumber: '1234567890', trainingProgress: '56 %', date_completed: '02-12-2019', status: 'Incomplete' },
  { date_joined: '11-09-2019', name: 'Lorem Ipsum', email: 'LoremIpsumis@gmail.com', phoneNumber: '1234567890', trainingProgress: '56 %', date_completed: '02-12-2019', status: 'Incomplete' },
  { date_joined: '11-09-2019', name: 'Lorem Ipsum', email: 'LoremIpsumis@gmail.com', phoneNumber: '1234567890', trainingProgress: '56 %', date_completed: '02-12-2019', status: 'Incomplete' },
  { date_joined: '11-09-2019', name: 'Lorem Ipsum', email: 'LoremIpsumis@gmail.com', phoneNumber: '1234567890', trainingProgress: '56 %', date_completed: '02-12-2019', status: 'Incomplete' },
  { date_joined: '11-09-2019', name: 'Lorem Ipsum', email: 'LoremIpsumis@gmail.com', phoneNumber: '1234567890', trainingProgress: '56 %', date_completed: '02-12-2019', status: 'Incomplete' },
  { date_joined: '11-09-2019', name: 'Lorem Ipsum', email: 'LoremIpsumis@gmail.com', phoneNumber: '1234567890', trainingProgress: '56 %', date_completed: '02-12-2019', status: 'Incomplete' },
];


const UA_DATA: UAElement[] = [
  { image_URL1: '../../../../assets/images/adm-UA-img1.jpg', name: 'Lorem I psum is', phoneNumber: '0000 000 000', date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage' },
  { image_URL1: '../../../../assets/images/adm-UA-img2.jpg', name: 'Lorem I psum is', phoneNumber: '0000 000 000', date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage' },
  { image_URL1: '../../../../assets/images/adm-UA-img3.jpg', name: 'Lorem I psum is', phoneNumber: '0000 000 000', date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage' },
  { image_URL1: '../../../../assets/images/adm-UA-img4.jpg', name: 'Lorem I psum is', phoneNumber: '0000 000 000', date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage' },
  { image_URL1: '../../../../assets/images/adm-UA-img5.jpg', name: 'Lorem I psum is', phoneNumber: '0000 000 000', date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage' },
  { image_URL1: '../../../../assets/images/adm-UA-img6.jpg', name: 'Lorem I psum is', phoneNumber: '0000 000 000', date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage' },
  { image_URL1: '../../../../assets/images/adm-UA-img7.jpg', name: 'Lorem I psum is', phoneNumber: '0000 000 000', date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage' },
  { image_URL1: '../../../../assets/images/adm-UA-img8.jpg', name: 'Lorem I psum is', phoneNumber: '0000 000 000', date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage' }
];


// const JobTicket_DATA: JTElement[] = [
//   {ticket: '123456', name: 'Lorem I psum is', image_URL: '../../../../assets/images/carimg1.jpg', title: 'Lorem I psum is' , repName: 'Lorem psum', customerName: 'Lorem Ipsum', subject: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.', status:'active',  action: 'Manage'},
//   {ticket: '123456', name: 'Lorem I psum is', image_URL: '../../../../assets/images/carimg2.jpg', title: 'Lorem I psum is' , repName: 'Lorem psum', customerName: 'Lorem Ipsum', subject: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.', status:'active',  action: 'Manage'},
//   {ticket: '123456', name: 'Lorem I psum is', image_URL: '../../../../assets/images/carimg3.jpg', title: 'Lorem I psum is' , repName: 'Lorem psum', customerName: 'Lorem Ipsum', subject: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.', status:'active',  action: 'Manage'},
//   {ticket: '123456', name: 'Lorem I psum is', image_URL: '../../../../assets/images/carimg1.jpg', title: 'Lorem I psum is' , repName: 'Lorem psum', customerName: 'Lorem Ipsum', subject: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.', status:'active',  action: 'Manage'},
//   {ticket: '123456', name: 'Lorem I psum is', image_URL: '../../../../assets/images/carimg2.jpg', title: 'Lorem I psum is' , repName: 'Lorem psum', customerName: 'Lorem Ipsum', subject: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.', status:'active',  action: 'Manage'},
//   {ticket: '123456', name: 'Lorem I psum is', image_URL: '../../../../assets/images/carimg3.jpg', title: 'Lorem I psum is' , repName: 'Lorem psum', customerName: 'Lorem Ipsum', subject: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.', status:'active',  action: 'Manage'},
// ];





//component for delete modal

@Component({
  selector: 'app-deleteModalRsvp',
  templateUrl: './deleteModalRsvp.html'
})
export class DeleteModalRsvpComponent {
  constructor(public dialogRef: MatDialogRef<DeleteModalRsvpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }
}




//modal component for delete job ticket


@Component({
  selector: 'deleteJobticket',
  templateUrl: './deleteJobticket.html'
})
export class DeleteJobTicketModalComponent {
  constructor(public dialogRef: MatDialogRef<DeleteJobTicketModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }
}


// modal for send rsvp mail 

@Component({
  selector: 'app-askForconfirmationDialog',
  templateUrl: './askForconfirmationDialog.html'
})
export class askForconfirmationDialogComponent {
  // public editorconfig: any = [];
  public topPart: any = '';
  public highest_bid: any = '';
  public flagVal: any = 1;

  constructor(public dialogRef: MatDialogRef<askForconfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData1, public fb: FormBuilder, public apiService: ApiService, public _sanitizer: DomSanitizer) {

    //  this.editorconfig.extraAllowedContent = '*[class](*),span;ul;li;table;td;style;*[id];*(*);*{*}';
  }

  submitform(val: any, flag: string, val1: any) {
    console.log(val, val1, flag)
    // this.data.topPart = JSON.stringify(val);
    this.data.topPart = val;
    this.data.highest_bid = val1;
    this.data.flag = flag;
    // console.log(this.data)
    this.dialogRef.close(this.data);
  }

  preview() {
    this.flagVal = 0;
  }
  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
}





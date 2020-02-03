import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MetaService } from '@ngx-meta/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';



// const UA_DATA: UpcomingAppoinement[] = [
//   {name: 'Lorem I psum is', phoneNumber: '0000 000 000' , date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage', image_URL: '../../../../assets/images/adm-UA-img1.jpg'},
//   {name: 'Lorem I psum is', phoneNumber: '0000 000 000' , date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage', image_URL: '../../../../assets/images/adm-UA-img2.jpg'},
//   {name: 'Lorem I psum is', phoneNumber: '0000 000 000' , date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage', image_URL: '../../../../assets/images/adm-UA-img3.jpg'},
//   {name: 'Lorem I psum is', phoneNumber: '0000 000 000' , date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage', image_URL: '../../../../assets/images/adm-UA-img4.jpg'},
//   {name: 'Lorem I psum is', phoneNumber: '0000 000 000' , date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage', image_URL: '../../../../assets/images/adm-UA-img5.jpg'},
//   {name: 'Lorem I psum is', phoneNumber: '0000 000 000' , date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage', image_URL: '../../../../assets/images/adm-UA-img6.jpg'},
//   {name: 'Lorem I psum is', phoneNumber: '0000 000 000' , date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage', image_URL: '../../../../assets/images/adm-UA-img7.jpg'},
//   {name: 'Lorem I psum is', phoneNumber: '0000 000 000' , date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage', image_URL: '../../../../assets/images/adm-UA-img8.jpg'},
//   {name: 'Lorem I psum is', phoneNumber: '0000 000 000' , date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage', image_URL: '../../../../assets/images/adm-UA-img9.jpg'},
// ];


// const JobTicket_DATA: JobTicket[] = [
//   {ticket: '123456', name: 'Lorem I psum is', image_URL: '../../../../assets/images/carimg1.jpg', title: 'Lorem I psum is' , repName: 'Lorem psum', customerName: 'Lorem Ipsum', subject: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.', status:'active',  action: 'Manage'},
//   {ticket: '123456', name: 'Lorem I psum is', image_URL: '../../../../assets/images/carimg2.jpg', title: 'Lorem I psum is' , repName: 'Lorem psum', customerName: 'Lorem Ipsum', subject: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.', status:'active',  action: 'Manage'},
//   {ticket: '123456', name: 'Lorem I psum is', image_URL: '../../../../assets/images/carimg3.jpg', title: 'Lorem I psum is' , repName: 'Lorem psum', customerName: 'Lorem Ipsum', subject: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.', status:'active',  action: 'Manage'},
//   {ticket: '123456', name: 'Lorem I psum is', image_URL: '../../../../assets/images/carimg1.jpg', title: 'Lorem I psum is' , repName: 'Lorem psum', customerName: 'Lorem Ipsum', subject: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.', status:'active',  action: 'Manage'},
//   {ticket: '123456', name: 'Lorem I psum is', image_URL: '../../../../assets/images/carimg2.jpg', title: 'Lorem I psum is' , repName: 'Lorem psum', customerName: 'Lorem Ipsum', subject: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.', status:'active',  action: 'Manage'},
//   {ticket: '123456', name: 'Lorem I psum is', image_URL: '../../../../assets/images/carimg3.jpg', title: 'Lorem I psum is' , repName: 'Lorem psum', customerName: 'Lorem Ipsum', subject: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.', status:'active',  action: 'Manage'},
// ];

export interface DialogData {
  data: any;
  msg: any;
}

// export interface UpcomingAppoinement {
//   name: string;
//   phoneNumber: string;
//   date: string;
//   repName: string;
//   action: string;
//   image_URL: string;
// }

// export interface JobTicket {
//   ticket: string;
//   image_URL: string;
//   name: string;
//   title: string;
//   repName: string;
//   customerName: string;
//   subject: string;
//   status: string;
//   action: string;
// }

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public jobTicketList:any;
  public userCookies: any;
  public userid: any = '';
  public jobLength:any;

  public user_full_name: any = '';


  public datalist: any = '';
  public saveSearchIndex: any = 5;

  public rsvp_list: any = '';
  public ststus: number;


  public errorMsg: string = '';
  public stateList: any;
  public message: any = "Are you sure you want to delete this?";

  public indexvalue:number=5;

  public formTitle: any = "Contact Us Listing Page";
  // public serverUrl: any = 'https://o820cv2lu8.execute-api.us-east-2.amazonaws.com/production/api/';

  public getDataUrl: any = {
    endpoint: 'datalist',
    source: 'contactusForm'
  };
  public updateurl: any = "addorupdatedata";
  public deleteurl: any = {
    endpoint: "deletesingledata",
    source: "contactusForm"
  };
  public addEndpoint: any = 'demoappemailsend';
  public indexval: number = 3;
  public jobTicketDataList:any;

  public filterVal:any;
  public filterValstatus:any='';

  // public getDataUrl: any = 'datalist';
  public contactUsAllDataHeaderSkip: any = ['_id'];
  public contactUsAllDataModifyHeader: any = { addresses: 'Addresses', emails: 'Emails', locationname: 'Location Name', phones: 'Phones' };

  public serverUrl: any = this.ApiService.serverUrlDemo;


      // UAColumns: string[] = ['name', 'phoneNumber', 'date', 'repName', 'action'];
      // upcomingAppoinementDataSource = new MatTableDataSource<UpcomingAppoinement>(UA_DATA);
      // @ViewChild(MatPaginator, {static: false}) uaPaginator: MatPaginator;
    
    
    
      // JTColumns: string[] = ['ticket', 'name', 'repName', 'customerName',  'subject', 'status', 'action'];
      // @ViewChild(MatPaginator, {static: false}) jtPaginator: MatPaginator;
      // @ViewChild(MatSort, {static: false}) sort: MatSort;


  constructor(private readonly meta: MetaService, public ApiService: ApiService, public cookieService: CookieService, public activatedRoute: ActivatedRoute, public apiService: ApiService, public http: HttpClient, public dialog: MatDialog, public snack: MatSnackBar, public router: Router) {


    // this.meta.setTitle('About us dynamic');
    // this.meta.setTag('og:description', 'This is dynamic decription ');
    // this.meta.setTag('og:title', 'This is dynamic title with meta og ');
    // this.meta.setTag('og:type', 'website');
    // this.meta.setTag('og:image', 'https://upload.wikimedia.org/wikipedia/commons/f/f8/superraton.jpg');

        this.meta.setTitle('ProBid Auto - Customer Dashboard!');
        this.meta.setTag('og:title', 'ProBid Auto - Customer Dashboard');
        this.meta.setTag('twitter:title', 'ProBid Auto - Customer Dashboard');
        this.meta.setTag('og:type', 'website');
        this.meta.setTag('og:image', '../../assets/images/logomain.png');
        this.meta.setTag('twitter:image', '../../assets/images/logomain.png');
        this.meta.setTag('og:image', 'https://upload.wikimedia.org/wikipedia/commons/f/f8/superraton.jpg');



    if (this.cookieService.get('user_details') != undefined && this.cookieService.get('user_details') != null && this.cookieService.get('user_details') != '') {
      this.userCookies = JSON.parse(this.cookieService.get('user_details'));
      // console.log(this.userCookies);
      this.userid = this.userCookies._id;
      // console.log('>>>>',this.userid)   
    }


  }

  ngOnInit() {
    this.activatedRoute.data.forEach((data: any) => {
      // console.log('dash-data',data)
      this.datalist = data.rsvp.result;
      // console.log('dash-data', this.datalist)

    })

    // this.upcomingAppoinementDataSource.paginator = this.uaPaginator;



   //for job ticket

   let data:any;
   data={
     "source":"job_ticket_customer",
     condition:{
      ticket_added_by_object:this.userid
      }
   }
   this.apiService.CustomRequest(data,'datalist').subscribe(res=>{
     let result:any=res;
     this.jobTicketDataList=result.res

     this.jobLength=result.resc;
    //  console.log('>>>>>', this.jobTicketDataList)

     this.jobTicketList = new MatTableDataSource<JTElement>(this.jobTicketDataList);


    //  this.jobTicketList.paginator = this.jtPaginator;
    //  this.jobTicketList.sort = this.sort;

   })

  }

  applyFilter(filterVal:any) {
    // console.log(filterVal)
    this.jobTicketList.filter = filterVal.trim().toLowerCase();
  }


  viewDetails(item:any,status:any){
    // console.log(item)
    this.router.navigateByUrl('/manage-job-ticket/add/'+item.rsvp_id+'/'+status)
  }

      //job ticket status filter
      statusFilterForJT(val:any){
        console.log(val)
    
        let data:any;
    if (val !='') {
        data={
          endpoint:'datalist',
          source:"job_ticket_customer",
          condition:{
            "job_ticket_status":Number(val)
                }
           }
          }
          else{
            data={
            endpoint:'datalist',
          source:"job_ticket_customer"
            }
          }
          //  console.log(data)
        this.apiService.getDatalist(data).subscribe((res)=>{
          let result:any
          result=res;
          this.jobTicketDataList=result.res;
          
          setTimeout(() => {
            this.jobTicketList = new MatTableDataSource<JTElement>(this.jobTicketDataList);
            this.jobTicketList.paginator = this.paginator4;
          }, 500);
      
          // this.rsvp_list=result.res;
          // console.log(this.rsvp_list)
        })
    
      }

      clear(){
        this.filterVal = '';
        this.filterValstatus=''
        setTimeout(() => {
          this.jobTicketList = new MatTableDataSource<JTElement>(this.jobTicketDataList);
          this.jobTicketList.paginator = this.paginator4;
        }, 500);
    
        }


  //rsvp delete
  deleteRsvp(val: any, i: any) {
    // console.log(val, i);
    const dialogRef = this.dialog.open(RemoveRSvpModalComponent, {
      width: '250px',
      data: this.message

    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result)

      if (result == 'yes') {
        let data: any = {
          id: val._id,
          source: 'send_for_rsvp'
        }
        this.apiService.deleteSingleData1(data).subscribe((res: any) => {
          // console.log(res);
          if (res.status == 'success') {
            this.datalist.rsvp_list.splice(i, i + 1);
            this.snack.open('Record Removed Successfully..!', 'Ok', { duration: 4000 })

          }
        })
      }
    })

  }

  //for save search
  deleteSaveSearch(item: any, i: any) {
    // console.log('this is favorite ', item, i);

    const dialogRef = this.dialog.open(RemoveRSvpModalComponent, {
      width: '250px',
      data: this.message

    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result)

      if (result == 'yes') {
        let data: any = {
          id: item._id,
          source: 'save_favorite'
        }
        this.apiService.deleteSingleData1(data).subscribe((res: any) => {
          // console.log(res);
          if (res.status == 'success') {
            this.datalist.save_search.splice(i, i + 1);
            this.snack.open('Record Removed Successfully..!', 'Ok', { duration: 2000 })

          }
        })
      }
    })

  }

  rsvpDetail(val:any){
    // console.log('hit',val)
    this.router.navigateByUrl('/rsvp-detail/'+val);
  }

  inventoryDetails(val:any){
    // console.log('details>>',val)
    this.router.navigateByUrl('/inventory-detail/'+val);
  }



//delete JobTicket record
deleteJobTicket(val:any,index:any){
  // console.log('delete hit',val,index)
  const dialogRef = this.dialog.open(DeleteJobTicketCusModalComponent, {
   
    data:this.message

  });

  dialogRef.afterClosed().subscribe(result => {
    
      if(result=='yes'){
        let data:any;
          data={
          "source":"job_ticket",
          id:val
          }
          this.apiService.CustomRequest(data,'deletesingledata').subscribe((res)=>{
            let result:any;
            result=res;
            
            if(result.status=='success'){
              this.jobTicketDataList = this.jobTicketDataList.filter( jobTicketDataList => jobTicketDataList._id != val)
              // this.jobTicketDataList.splice(index,1);
              this.jobTicketList = new MatTableDataSource<JTElement>(this.jobTicketDataList);

              this.snack.open('Record Deleted Successfully..!','Ok',{duration:2000})
              
            }
          })
      }
  });
}
  
  displayedColumns3 = ['image_URL1', 'name', 'phoneNumber', 'date', 'repName', 'action'];
  dataSource3 = new MatTableDataSource<UAElement>(UA_DATA);

  displayedColumns4 = ['ticket', 'car_image', 'name', 'repName', 'customerName', 'subject', 'date', 'status', 'action'];
  // dataSource4 = new MatTableDataSource<JTElement>(JobTicket_DATA);

   
  @ViewChild('paginator3', {static: false}) paginator3: MatPaginator;
  @ViewChild('paginator4', {static: false}) paginator4: MatPaginator;


 

  ngAfterViewInit1() {
    this.dataSource3.paginator = this.paginator3;
    this.jobTicketList.paginator = this.paginator4;
  }


  _setCommunicationDataSource(indexNumber) {
    setTimeout(() => {
      switch (indexNumber) {
        case 0:
          !this.dataSource3.paginator ? this.dataSource3.paginator = this.paginator3 : null;
          break;
        case 1:
          !this.jobTicketList.paginator ? this.jobTicketList.paginator = this.paginator4 : null;
      }
    });
  }




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
    date:string;
    subject: string;
    status: string;
    action: string;
}



const UA_DATA: UAElement[] = [
  {image_URL1: '../../../../assets/images/adm-UA-img1.jpg', name: 'Lorem I psum is', phoneNumber: '0000 000 000' , date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage'},
  {image_URL1: '../../../../assets/images/adm-UA-img2.jpg', name: 'Lorem I psum is', phoneNumber: '0000 000 000' , date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage'},
  {image_URL1: '../../../../assets/images/adm-UA-img3.jpg', name: 'Lorem I psum is', phoneNumber: '0000 000 000' , date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage'},
  {image_URL1: '../../../../assets/images/adm-UA-img4.jpg', name: 'Lorem I psum is', phoneNumber: '0000 000 000' , date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage'},
  {image_URL1: '../../../../assets/images/adm-UA-img5.jpg', name: 'Lorem I psum is', phoneNumber: '0000 000 000' , date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage'},
  {image_URL1: '../../../../assets/images/adm-UA-img6.jpg', name: 'Lorem I psum is', phoneNumber: '0000 000 000' , date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage'},
  {image_URL1: '../../../../assets/images/adm-UA-img7.jpg', name: 'Lorem I psum is', phoneNumber: '0000 000 000' , date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage'},
  {image_URL1: '../../../../assets/images/adm-UA-img8.jpg', name: 'Lorem I psum is', phoneNumber: '0000 000 000' , date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage'}
  ];


//modal component for delete RSVP


@Component({
  selector: 'app-removeRsvpModal',
  templateUrl: './removeRsvpModal.html'
})
export class RemoveRSvpModalComponent {
  constructor(public dialogRef: MatDialogRef<RemoveRSvpModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }
}


@Component({
  selector:'deleteJobticket',
  templateUrl:'./deleteJobticket.html'
})
export class DeleteJobTicketCusModalComponent {
  constructor( public dialogRef: MatDialogRef<DeleteJobTicketCusModalComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData){

  }
}
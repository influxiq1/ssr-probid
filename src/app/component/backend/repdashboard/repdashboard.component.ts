import { Component, OnInit,Inject, ViewChild} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute ,Router} from '@angular/router';
import { ApiService } from '../../../api.service';
// import { MatDialog } from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FacebookService, LoginResponse, UIParams, UIResponse } from 'ngx-facebook';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FormBuilder } from '@angular/forms';
import { MetaService } from '@ngx-meta/core';
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
  msg:any;
} 

export interface UpcomingAppoinement {
  name: string;
  phoneNumber: string;
  date: string;
  repName: string;
  action: string;
  image_URL: string;
}

export interface JobTicket {
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

@Component({
  selector: 'app-repdashboard',
  templateUrl: './repdashboard.component.html',
  styleUrls: ['./repdashboard.component.css']
})
export class RepdashboardComponent implements OnInit {
  public userCookies: any;
  public userid: any = '';

  public datalist: any = '';
  public saveSearchIndex:any=5;
  public message:any="Are you sure you want to delete this?";
  public rsvpList:any;
  public saveSearchList:any;
  public jobTicketList:any;

  
  public indexval:any=6;
  public indexValForLinkdin: any = 6;
  public errorApiKey:any;
  public jobTicketDataList:any;

  
  public allFacebookBanner : any = [
    'facebookbanner-img1.jpg', 'facebookbanner-img2.jpg', 'facebookbanner-img3.jpg', 'facebookbanner-img4.jpg', 'facebookbanner-img5.jpg', 'facebookbanner-img6.jpg', 'facebookbanner-img7.jpg', 'facebookbanner-img8.jpg', 'facebookbanner-img9.jpg', 'facebookbanner-img10.jpg', 'facebookbanner-img11.jpg', 'facebookbanner-img12.jpg', 'facebookbanner-img13.jpg', 'facebookbanner-img14.jpg', 'facebookbanner-img15.jpg', 'facebookbanner-img16.jpg', 'facebookbanner-img17.jpg', 'facebookbanner-img18.jpg', 'facebookbanner-img19.jpg', 'facebookbanner-img20.jpg', 'facebookbanner-img21.jpg', 'facebookbanner-img22.jpg', 'facebookbanner-img23.jpg', 'facebookbanner-img24.jpg', 'facebookbanner-img25.jpg', 'facebookbanner-img26.jpg', 'facebookbanner-img27.jpg', 'facebookbanner-img28.jpg', 'facebookbanner-img29.jpg', 'facebookbanner-img30.jpg', 'facebookbanner-img31.jpg', 'facebookbanner-img32.jpg', 'facebookbanner-img33.jpg', 'facebookbanner-img34.jpg', 'facebookbanner-img35.jpg', 'facebookbanner-img36.jpg'];
public allLinkdinBanner : any = [
      'linkedinbanner-img1.jpg', 'linkedinbanner-img2.jpg', 'linkedinbanner-img3.jpg', 'linkedinbanner-img4.jpg', 'linkedinbanner-img5.jpg', 'linkedinbanner-img6.jpg', 'linkedinbanner-img7.jpg', 'linkedinbanner-img8.jpg', 'linkedinbanner-img9.jpg', 'linkedinbanner-img10.jpg', 'linkedinbanner-img11.jpg', 'linkedinbanner-img12.jpg', 'linkedinbanner-img13.jpg', 'linkedinbanner-img14.jpg', 'linkedinbanner-img15.jpg', 'linkedinbanner-img16.jpg', 'linkedinbanner-img17.jpg', 'linkedinbanner-img18.jpg', 'linkedinbanner-img19.jpg', 'linkedinbanner-img20.jpg', 'linkedinbanner-img21.jpg', 'linkedinbanner-img22.jpg', 'linkedinbanner-img23.jpg', 'linkedinbanner-img24.jpg', 'linkedinbanner-img25.jpg', 'linkedinbanner-img26.jpg', 'linkedinbanner-img27.jpg', 'linkedinbanner-img28.jpg', 'linkedinbanner-img29.jpg', 'linkedinbanner-img30.jpg', 'linkedinbanner-img31.jpg', 'linkedinbanner-img32.jpg', 'linkedinbanner-img33.jpg', 'linkedinbanner-img34.jpg', 'linkedinbanner-img35.jpg', 'linkedinbanner-img36.jpg', 'linkedinbanner-img37.jpg', 'linkedinbanner-img38.jpg', 'linkedinbanner-img39.jpg', 'linkedinbanner-img40.jpg', 'linkedinbanner-img41.jpg', 'linkedinbanner-img42.jpg'];



      // UAColumns: string[] = ['name', 'phoneNumber', 'date', 'repName', 'action'];
      // upcomingAppoinementDataSource = new MatTableDataSource<UpcomingAppoinement>(UA_DATA);
      // @ViewChild(MatPaginator, {static: false}) uaPaginator: MatPaginator;
    
    
    
      // JTColumns: string[] = ['ticket', 'name', 'repName', 'customerName',  'subject', 'status', 'action'];
      // jobTicketDataSource = new MatTableDataSource<JobTicket>(JobTicket_DATA);
      // @ViewChild(MatPaginator, {static: false}) jtPaginator: MatPaginator;
      // @ViewChild(MatSort, {static: false}) sort: MatSort;




  
  constructor(public cookieService: CookieService, public activatedRoute: ActivatedRoute, public apiService: ApiService, public dialog: MatDialog,public snack:MatSnackBar,public router:Router, 
    // private fb1: FacebookService, 
    public fb:FormBuilder, private readonly meta: MetaService) {
    if (this.cookieService.get('user_details') != undefined && this.cookieService.get('user_details') != null && this.cookieService.get('user_details') != '') {
      this.userCookies = JSON.parse(this.cookieService.get('user_details'));
      this.userid = this.userCookies._id; 
      console.log(this.userCookies)
      
      }
      // fb1.init({
      //   appId: '2540470256228526',
      //   version: 'v2.9'
      // });

      this.meta.setTitle('ProBid Auto - SalesRep Dashboard!');
      this.meta.setTag('og:title', 'ProBid Auto - SalesRep Dashboard');
      this.meta.setTag('twitter:title', 'ProBid Auto - SalesRep Dashboard');
      this.meta.setTag('og:type', 'website');
      this.meta.setTag('og:image', '../../assets/images/logomain.png');
      this.meta.setTag('twitter:image', '../../assets/images/logomain.png');
   }



   
   /* To copy Text from Textbox */
  // copyInputMessage(inputElement){
  //   inputElement.select();
  //   document.execCommand('copy');
  //   inputElement.setSelectionRange(0, 0);
  // }
  copyMessage(val: string){
    let url = this.apiService.share_link+'customer-signup/'+val+'/'+this.userCookies._id;
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
    this.snack.open('Url Copied on clipboard','ok',{
      duration:2000
    })

  }

  // logoutWithFacebook(): void {
  //   this.fb1.logout().then();
  // }

  // auto_grow(element) {
  //     element.style.height = "5px";
  //     element.style.height = (element.scrollHeight)+"px";
  // }

  

  // linkdinShare(url: any){
  //   var fullUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=https://dev.probidauto.com/customer-signup/'+url+'/'+this.userCookies._id;
  //   // console.log(fullUrl)

  // }

  // share(url: string) {

  //   var fullUrl = 'https://dev.probidauto.com/customer-signup/'+url+'/'+this.userCookies._id;

  //   this.cookieService.set('shareIngUrl',fullUrl);

  //   let params: UIParams = {
  //     href: fullUrl,
  //     method: 'share',
  //     quote: 'https://dev.probidauto.com/'
  //   };
   
  //   this.fb1.ui(params)
  //     .then((res: UIResponse) =>{

  //     })
  //     .catch();   
  // }



  ngOnInit() {
    this.activatedRoute.data.forEach((data:any) => {
      // console.log('dash-data',data)

      this.datalist = data.rsvp.result;

      // console.log('...>>',this.datalist.customer_list)

      this.rsvpList=data.rsvp.result.rsvp_list

      this.saveSearchList=data.rsvp.result.save_search 
    })



    // this.upcomingAppoinementDataSource.paginator = this.uaPaginator;

    // this.jobTicketDataSource.paginator = this.jtPaginator;


   //for job ticket

   let data:any;
   data={
     source:"job_ticket_customer",
     condition:{
      ticket_added_by_object:this.userid
      }
   }
   this.apiService.CustomRequest(data,'datalist').subscribe(res=>{
     let result:any=res;
     this.jobTicketDataList=result.res
    //  console.log('>>>>>', this.jobTicketDataList)

     this.jobTicketList = new MatTableDataSource<JobTicket>(this.jobTicketDataList);


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



  
  
  // share(url: string) {
  //   var fullUrl = 'https://dev.probidauto.com/customer-signup/'+url+'/'+this.userCookies._id;
  //   this.cookieService.set('shareIngUrl',fullUrl);
  //   // console.log(fullUrl)
 
  //   let params: UIParams = {
  //     href: fullUrl,
  //     method: 'share',
  //     quote: 'https://dev.probidauto.com/'
  //   };
   
  //   this.fb1.ui(params)
  //     .then((res: UIResponse) =>{

  //     })
  //     .catch();
   
  // }

  /* To copy Text from Textbox */
  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  deleteAny(a: any,b: any,c: any){

  }

  deleteRsvp(item: any,index:any){
    // console.log('this is favorite ',item,index);
    const dialogRef = this.dialog.open(RemoveDialogComponent, {
      width: '250px',
      data:this.message

    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result)
      
        if(result=='yes'){
    let data: any = {
      id:item._id,
      source: 'send_for_rsvp'
    }
    this.apiService.deleteSingleData1(data).subscribe((res: any)=>{
      // console.log(res);
      if (res.status == 'success') {
        this.rsvpList.splice(index,index+1);
        this.snack.open('Record Removed Successfully..!','Ok',{duration:2000})
        
      }
    })
  }
})


  }

  deleteSaveSearch(item: any,index:any){
    // console.log('this is favorite ',item,index);

    const dialogRef = this.dialog.open(RemoveDialogComponent, {
      width: '250px',
      data:this.message

    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result)
      
        if(result=='yes'){
    let data: any = {
      id:item._id,
      source: 'save_favorite'
    }
    this.apiService.deleteSingleData1(data).subscribe((res: any)=>{
      // console.log(res);
      if (res.status == 'success') {
        this.saveSearchList.splice(index,index+1);
        this.snack.open('Record Removed Successfully..!','Ok',{duration:2000})
        
      }
    })
  }
})

  }

  //for save search details
  viewSaveDetails(val:any){
    console.log(val)
    this.router.navigateByUrl('/inventory-detail/'+val);
  }

  //for rsvp details
  viewRsvpDetails(val:any){
    console.log(val)
    this.router.navigateByUrl('/rsvp-detail/'+val);
  }


  //delete JobTicket record
  deleteJobTicket(val:any,index:any){
    console.log('delete hit',val,index)
    const dialogRef = this.dialog.open(DeleteJobRepTicketModalComponent, {
     
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

  displayedColumns4 = ['ticket', 'car_image', 'name', 'repName', 'customerName', 'date', 'subject', 'status', 'action'];
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


//modal component for delete RSVP & 


@Component({
  selector:'app-removeDialog',
  templateUrl:'./removeDialog.html'
})
export class RemoveDialogComponent {
  constructor( public dialogRef: MatDialogRef<RemoveDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData){

  }
}

@Component({
  selector:'deleteJobticket',
  templateUrl:'./deleteJobticket.html'
})
export class DeleteJobRepTicketModalComponent {
  constructor( public dialogRef: MatDialogRef<DeleteJobRepTicketModalComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData){

  }
}
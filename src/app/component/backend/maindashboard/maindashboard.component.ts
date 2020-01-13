import { Component, OnInit, ViewChild ,Inject} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute ,Router} from '@angular/router';
import { ApiService } from '../../../api.service';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormGroup, FormBuilder ,FormGroupDirective, Validators} from '@angular/forms';
import { UIParams, UIResponse, FacebookService } from 'ngx-facebook';
// import { askForconfirmationModalComponent } from '../rsvplists/rsvplists.component';



export interface DialogData {
  data: any;
  msg:any;
}


const UA_DATA: UpcomingAppoinement[] = [
  {name: 'Lorem I psum is', phoneNumber: '0000 000 000' , date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage', image_URL: '../../../../assets/images/adm-UA-img1.jpg'},
  {name: 'Lorem I psum is', phoneNumber: '0000 000 000' , date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage', image_URL: '../../../../assets/images/adm-UA-img2.jpg'},
  {name: 'Lorem I psum is', phoneNumber: '0000 000 000' , date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage', image_URL: '../../../../assets/images/adm-UA-img3.jpg'},
  {name: 'Lorem I psum is', phoneNumber: '0000 000 000' , date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage', image_URL: '../../../../assets/images/adm-UA-img4.jpg'},
  {name: 'Lorem I psum is', phoneNumber: '0000 000 000' , date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage', image_URL: '../../../../assets/images/adm-UA-img5.jpg'},
  {name: 'Lorem I psum is', phoneNumber: '0000 000 000' , date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage', image_URL: '../../../../assets/images/adm-UA-img6.jpg'},
  {name: 'Lorem I psum is', phoneNumber: '0000 000 000' , date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage', image_URL: '../../../../assets/images/adm-UA-img7.jpg'},
  {name: 'Lorem I psum is', phoneNumber: '0000 000 000' , date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage', image_URL: '../../../../assets/images/adm-UA-img8.jpg'},
  {name: 'Lorem I psum is', phoneNumber: '0000 000 000' , date: '26-11-2019 16:50', repName: 'Lorem I psum', action: 'Manage', image_URL: '../../../../assets/images/adm-UA-img9.jpg'},
];


const JobTicket_DATA: JobTicket[] = [
  {ticket: '123456', name: 'Lorem I psum is', image_URL: '../../../../assets/images/carimg1.jpg', title: 'Lorem I psum is' , repName: 'Lorem psum', customerName: 'Lorem Ipsum', subject: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.', status:'active',  action: 'Manage'},
  {ticket: '123456', name: 'Lorem I psum is', image_URL: '../../../../assets/images/carimg2.jpg', title: 'Lorem I psum is' , repName: 'Lorem psum', customerName: 'Lorem Ipsum', subject: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.', status:'active',  action: 'Manage'},
  {ticket: '123456', name: 'Lorem I psum is', image_URL: '../../../../assets/images/carimg3.jpg', title: 'Lorem I psum is' , repName: 'Lorem psum', customerName: 'Lorem Ipsum', subject: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.', status:'active',  action: 'Manage'},
  {ticket: '123456', name: 'Lorem I psum is', image_URL: '../../../../assets/images/carimg1.jpg', title: 'Lorem I psum is' , repName: 'Lorem psum', customerName: 'Lorem Ipsum', subject: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.', status:'active',  action: 'Manage'},
  {ticket: '123456', name: 'Lorem I psum is', image_URL: '../../../../assets/images/carimg2.jpg', title: 'Lorem I psum is' , repName: 'Lorem psum', customerName: 'Lorem Ipsum', subject: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.', status:'active',  action: 'Manage'},
  {ticket: '123456', name: 'Lorem I psum is', image_URL: '../../../../assets/images/carimg3.jpg', title: 'Lorem I psum is' , repName: 'Lorem psum', customerName: 'Lorem Ipsum', subject: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.', status:'active',  action: 'Manage'},
];



const Reports_DATA: Reports[] = [
  {date_joined: '11-09-2019', name: 'Lorem Ipsum' , email: 'LoremIpsumis@gmail.com', phoneNumber:'1234567890', trainingProgress: '56 %', date_completed: '02-12-2019', status:'complete'},
  {date_joined: '11-09-2019', name: 'Lorem Ipsum' , email: 'LoremIpsumis@gmail.com', phoneNumber:'1234567890', trainingProgress: '56 %', date_completed: '02-12-2019', status:'Incomplete'},
  {date_joined: '11-09-2019', name: 'Lorem Ipsum' , email: 'LoremIpsumis@gmail.com', phoneNumber:'1234567890', trainingProgress: '56 %', date_completed: '02-12-2019', status:'Incomplete'},
  {date_joined: '11-09-2019', name: 'Lorem Ipsum' , email: 'LoremIpsumis@gmail.com', phoneNumber:'1234567890', trainingProgress: '56 %', date_completed: '02-12-2019', status:'Incomplete'},
  {date_joined: '11-09-2019', name: 'Lorem Ipsum' , email: 'LoremIpsumis@gmail.com', phoneNumber:'1234567890', trainingProgress: '56 %', date_completed: '02-12-2019', status:'Incomplete'},
  {date_joined: '11-09-2019', name: 'Lorem Ipsum' , email: 'LoremIpsumis@gmail.com', phoneNumber:'1234567890', trainingProgress: '56 %', date_completed: '02-12-2019', status:'Incomplete'},
  {date_joined: '11-09-2019', name: 'Lorem Ipsum' , email: 'LoremIpsumis@gmail.com', phoneNumber:'1234567890', trainingProgress: '56 %', date_completed: '02-12-2019', status:'Incomplete'},
  {date_joined: '11-09-2019', name: 'Lorem Ipsum' , email: 'LoremIpsumis@gmail.com', phoneNumber:'1234567890', trainingProgress: '56 %', date_completed: '02-12-2019', status:'Incomplete'},
];



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
  image_URL: string;
  name: string;
  title: string;
  repName: string;
  customerName: string;
  subject: string;
  status: string;
  action: string;
}


export interface Reports {
  date_joined: string;
  name: string;
  email: string;
  phoneNumber: string;
  trainingProgress: string;
  date_completed: string;
  status: string;
}



@Component({
  selector: 'app-maindashboard',
  templateUrl: './maindashboard.component.html',
  styleUrls: ['./maindashboard.component.css']
})
export class MaindashboardComponent implements OnInit {

  public indexval:any=6;
  public indexValForLinkdin: any = 6;
  public errorApiKey:any;
  
  public allFacebookBanner : any = [
    'facebookbanner-img1.jpg', 'facebookbanner-img2.jpg', 'facebookbanner-img3.jpg', 'facebookbanner-img4.jpg', 'facebookbanner-img5.jpg', 'facebookbanner-img6.jpg', 'facebookbanner-img7.jpg', 'facebookbanner-img8.jpg', 'facebookbanner-img9.jpg', 'facebookbanner-img10.jpg', 'facebookbanner-img11.jpg', 'facebookbanner-img12.jpg', 'facebookbanner-img13.jpg', 'facebookbanner-img14.jpg', 'facebookbanner-img15.jpg', 'facebookbanner-img16.jpg', 'facebookbanner-img17.jpg', 'facebookbanner-img18.jpg', 'facebookbanner-img19.jpg', 'facebookbanner-img20.jpg', 'facebookbanner-img21.jpg', 'facebookbanner-img22.jpg', 'facebookbanner-img23.jpg', 'facebookbanner-img24.jpg', 'facebookbanner-img25.jpg', 'facebookbanner-img26.jpg', 'facebookbanner-img27.jpg', 'facebookbanner-img28.jpg', 'facebookbanner-img29.jpg', 'facebookbanner-img30.jpg', 'facebookbanner-img31.jpg', 'facebookbanner-img32.jpg', 'facebookbanner-img33.jpg', 'facebookbanner-img34.jpg', 'facebookbanner-img35.jpg', 'facebookbanner-img36.jpg'];
public allLinkdinBanner : any = [
      'linkedinbanner-img1.jpg', 'linkedinbanner-img2.jpg', 'linkedinbanner-img3.jpg', 'linkedinbanner-img4.jpg', 'linkedinbanner-img5.jpg', 'linkedinbanner-img6.jpg', 'linkedinbanner-img7.jpg', 'linkedinbanner-img8.jpg', 'linkedinbanner-img9.jpg', 'linkedinbanner-img10.jpg', 'linkedinbanner-img11.jpg', 'linkedinbanner-img12.jpg', 'linkedinbanner-img13.jpg', 'linkedinbanner-img14.jpg', 'linkedinbanner-img15.jpg', 'linkedinbanner-img16.jpg', 'linkedinbanner-img17.jpg', 'linkedinbanner-img18.jpg', 'linkedinbanner-img19.jpg', 'linkedinbanner-img20.jpg', 'linkedinbanner-img21.jpg', 'linkedinbanner-img22.jpg', 'linkedinbanner-img23.jpg', 'linkedinbanner-img24.jpg', 'linkedinbanner-img25.jpg', 'linkedinbanner-img26.jpg', 'linkedinbanner-img27.jpg', 'linkedinbanner-img28.jpg', 'linkedinbanner-img29.jpg', 'linkedinbanner-img30.jpg', 'linkedinbanner-img31.jpg', 'linkedinbanner-img32.jpg', 'linkedinbanner-img33.jpg', 'linkedinbanner-img34.jpg', 'linkedinbanner-img35.jpg', 'linkedinbanner-img36.jpg', 'linkedinbanner-img37.jpg', 'linkedinbanner-img38.jpg', 'linkedinbanner-img39.jpg', 'linkedinbanner-img40.jpg', 'linkedinbanner-img41.jpg', 'linkedinbanner-img42.jpg'];



  public apikeyForm:FormGroup;


  public message:any="Are you sure you want to delete this?"

// public static: any; 
public userCookies: any;
public user_full_name: any = '';


public rsvp_list: any = '';
public saveSearch_list: any = '';
public ststus: number;

 
public rsvpIndex:any=2;
public saveSearchIndex:any=10;

public socialadvoFBIndex:any=6;
public socialadvoLDIndex:any=6;





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
  public user_details:any;
  public user_id: string = '';
  public modalImg: string = '';
  public isFavorite: number = 0;
  public customerList: any = '';
  public customur_id: any = '';
  public crsvplist:any ='';
  public count:any ='';


  // socialAdvFacebookLists: socialFacebookAdvos[];
  // socialAdvLinkedinLists: socialLinkedinAdvos[];

  

  
  UAColumns: string[] = ['name', 'phoneNumber', 'date', 'repName', 'action'];
  upcomingAppoinementDataSource = new MatTableDataSource<UpcomingAppoinement>(UA_DATA);
  @ViewChild(MatPaginator, {static: false}) uaPaginator: MatPaginator;



  JTColumns: string[] = ['ticket', 'name', 'title', 'repName', 'customerName',  'subject', 'status', 'action'];
  jobTicketDataSource = new MatTableDataSource<JobTicket>(JobTicket_DATA);
  @ViewChild(MatPaginator, {static: false}) jtPaginator: MatPaginator;


  ReportColumns: string[] = ['date_joined', 'name', 'email', 'phoneNumber', 'trainingProgress', 'date_completed', 'status'];
  reportsDataSource = new MatTableDataSource<Reports>(Reports_DATA);
  @ViewChild(MatPaginator, {static: false}) reportPaginator: MatPaginator;


  @ViewChild(FormGroupDirective, {static: false}) formDirective: FormGroupDirective;
  constructor(public cookieService: CookieService,
     public activatedRoute: ActivatedRoute,
      public apiService: ApiService,
       public http: HttpClient,
        public dialog: MatDialog,
        public snack:MatSnackBar,
        public router:Router,
        public fb:FormBuilder,
         private fb1: FacebookService) {
    

    this.userCookies = JSON.parse(this.cookieService.get('user_details'));
   
    
    fb1.init({
      appId: '2540470256228526',
      version: 'v2.9'
    });
  
    
   }
   

   /* To copy Text from Textbox */
  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }
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
  }

  logoutWithFacebook(): void {
    this.fb1.logout().then();
  }

  linkdinShare(url: any){
    var fullUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=https://dev.probidauto.com/customer-signup/'+url+'/'+this.userCookies._id;
    // console.log(fullUrl)

  }

  

  ngOnInit() {
    this.activatedRoute.data.forEach((data:any) => {
      // this.crsvplist = data.fordashboard.result.save_search;
      // console.log('dash-data',data)

      this.rsvp_list = data.rsvp.result.currentRsvp;

      this.saveSearch_list = data.rsvp.result.save_search;
      this.count = data.rsvp.result;

      // console.log('dvfdgfhg', this.count)
    })


    this.upcomingAppoinementDataSource.paginator = this.uaPaginator;

    this.jobTicketDataSource.paginator = this.jtPaginator;

    this.reportsDataSource.paginator = this.reportPaginator;
   this.generateForm();

  }


  share(url: string) {
    var fullUrl = 'https://dev.probidauto.com/customer-signup/'+url+'/'+this.userCookies._id;
    this.cookieService.set('shareIngUrl',fullUrl);
    // console.log(fullUrl)
 
    let params: UIParams = {
      href: fullUrl,
      method: 'share',
      quote: 'https://dev.probidauto.com/'
    };
   
    this.fb1.ui(params)
      .then((res: UIResponse) =>{

      })
      .catch();
   
  }

  changeStatus(item: any, val: any) {
    // console.log('rsvpSend status',item, val)
    let endpoint: any = "addorupdatedata";
    item.status = val;
    let card_data:any = {
      card_data: item,
      id:item._id
    }
    let data: any = {
      data: card_data,
      source: "send_for_rsvp",
    };
      this.apiService.CustomRequest(data, endpoint).subscribe((res:any) => {
        // console.log(res);
        (res.status == "success");
        // this.getdata();
      });
  }


  openModale(data:any){
    // // console.log(data)
    // const dialogRef = this.dialog.open(askForconfirmationModalComponent, {
    //   width: '250px',
    //   data:data

    // });
    // dialogRef.afterClosed().subscribe((result:any) => {
    //   // console.log(result);

    //   let carData:any={
    //     vehicle: result.heading,
    //     salesrep: result.added_by_fullname,
    //     customer: result.added_for_fullname,
    //     salesrep_email: result.added_by_email,
    //     customer_email: result.added_for_email,
    //     topPart: result.topPart,
    //     highest_bid: result.highest_bid,
    //     status: 3

    //   }

    //   if(result.flag == 'yes' ){

    //   let endpoint: any = "addorupdatedatawithouttoken";
    
    //     let data: any = {
    //       data: carData,  
    //       source: "ask_for_confirmation",
    //     };
    //       this.apiService.CustomRequest(data, endpoint).subscribe((res:any) => {
    //         (res.status == "success");
    //         // console.log(res)
    //       });
    //     } else {
    //       // console.log('No..!')
    //     }

    //     });
  }

generateForm(){
  this.apikeyForm=this.fb.group({
    apikey:['',Validators.required]
  })
}

//for new apikey submit
apiKeySubmit(){
  for (let x in this.apikeyForm.controls) {
    this.apikeyForm.controls[x].markAsTouched();
  }
  console.log(this.apikeyForm.value.apikey.length)
  if(this.apikeyForm.valid){
    this.errorApiKey=''
    if( this.apikeyForm.value.apikey.length ==32)
   {

console.log('hit')
    let data:any;
    data={
      data:this.apikeyForm.value,
      source:'search_api_key'
    }

    this.apiService.CustomRequest(data,'addorupdatedata').subscribe((res)=>{
      let result:any;
      result=res

      if(result.status == 'success'){
        this.formDirective.resetForm();
      }
    })
  }
   else {
    this.errorApiKey='Api Key Is Not Valid'
  }

  }
 
}

inputUntouched(val: any) {
  this.apikeyForm.controls[val].markAsUntouched();
}

  deleteAny(val:any,index:any,flag:string){
    const dialogRef = this.dialog.open(DeleteModalRsvpComponent, {
      width: '250px',
      data:this.message

    });

    dialogRef.afterClosed().subscribe(result => {
      
        if(result=='yes'){
          let data:any;
            if(flag=='rsvp'){
              data={
                source:"send_for_rsvp",
                id:val
                }
                this.apiService.CustomRequest(data,'deletesingledata').subscribe((res)=>{
                  let result:any;
                  result=res;
                  
                  if(result.status=='success'){
                    this.rsvp_list.splice(index,index+1);
                    this.snack.open('Record Deleted Successfully..!','Ok',{duration:4000})
                    
                  }
                })
            } 
           else {
              data={
                source:"save_favorite",
                id:val
                }
                this.apiService.CustomRequest(data,'deletesingledata').subscribe((res)=>{
                  let result:any;
                  result=res;
                  // console.log('success',result)
                  
                  if(result.status=='success'){
                    this.saveSearch_list.splice(index,index+1);
                    this.snack.open('Record Deleted Successfully..!','Ok',{duration:4000})
                    
                  }
                })
            }
        }
    });
  }


  //delete for save search data
  
//   deleteSaveAny(val:any,index:any){
//     const dialogRef = this.dialog.open(DeleteModalRsvpComponent, {
//       width: '250px',
//       data:this.message
//     });
//     dialogRef.afterClosed().subscribe(result => {
//       console.log(result)
//         if(result=='yes'){
//           let data:any;
//               data={
//                 source:"save_favorite ",
//                 id:val
//                 }
//                 this.apiService.CustomRequest(data,'deletesingledata').subscribe((res)=>{
//                   let result:any;
//                   result=res;
//                   // console.log('success',result)
                  
//                   if(result.status=='success'){
//                     this.saveSearch_list.splice(index,index+1);
//                     this.snack.open('Record Deleted Successfully..!','Ok',{duration:4000})
                    
//                   }
//                 })
//           }
//   })
// }



  // loadMoreSearchResult(){
  //   this.socialadvoIndex=this.socialadvoIndex+2;
  // }


  //for save search details
  viewSaveDetails(val:any){
    console.log(val)
    this.router.navigateByUrl('/inventory-detail/'+val);
  }

  //for rsvp details
  viewRsvpDetails(val:any){
    // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>test>>>>>>>>>>>>>>>>>>>>>>>>>>', val);
    this.router.navigateByUrl('/rsvp-detail/'+val);
  }

  //for view Job Ticket
  viewJobTicket(val:any){
    this.router.navigateByUrl('/manage-job-ticket/'+val);
  }


  private handleError(error) {
    console.error('Error processing action', error);
  }
  
  }

   



//component for delete modal

@Component({
  selector:'app-deleteModalRsvp',
  templateUrl:'./deleteModalRsvp.html'
})
export class DeleteModalRsvpComponent {
  constructor( public dialogRef: MatDialogRef<DeleteModalRsvpComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData){

  }
}


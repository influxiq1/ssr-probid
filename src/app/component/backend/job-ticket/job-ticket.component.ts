import { Component, OnInit,Inject,ViewChild} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from "@angular/material";
import { Router ,ActivatedRoute} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from '../../../api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MetaService } from '@ngx-meta/core';
import {MatSort} from '@angular/material/sort';
import { CookieService } from 'ngx-cookie-service';


export interface DialogData {
  data: any;
  msg:any;
} 

export interface JobTicket {
  ticket: string;
  image_URL: string;
  name: string;
  title: string;
  repName: string;
  customerName: string;
  subject: string;
  Date:any;
  status: string;
  action: string;
}


@Component({
  selector: 'app-job-ticket',
  templateUrl: './job-ticket.component.html',
  styleUrls: ['./job-ticket.component.css']
})
export class JobTicketComponent implements OnInit {

  public user_details:any;

  JTColumns: string[] = ['ticket', 'name', 'repName', 'customerName',  'subject',  'Date' ,'status', 'action'];
  // jobTicketDataSource = new MatTableDataSource<JobTicket>(JobTicket_DATA);
  @ViewChild(MatPaginator, {static: false}) jtPaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

public jobTicketDataList:any;
public indexVal:any=4;
public message:any="Are you sure you want to delete this?";
public jobTicketList:any;
public filterVal:any;
public filterValstatus:any='';

public userCookies: any;


  constructor(public router: Router,public activatedRoute:ActivatedRoute,
    public apiService: ApiService,
    public dialog: MatDialog,
    public snack:MatSnackBar, private readonly meta: MetaService,  public cookieService: CookieService) 
    { 
      this.meta.setTitle('ProBid Auto - Job Ticket');
        this.meta.setTag('og:title', 'ProBid Auto - Job Ticket');
        this.meta.setTag('twitter:title', 'ProBid Auto - Job Ticket');
        this.meta.setTag('og:type', 'website');
        this.meta.setTag('og:image', '../../assets/images/logomain.png');
        this.meta.setTag('twitter:image', '../../assets/images/logomain.png');

        if (this.cookieService.get('user_details') != undefined && this.cookieService.get('user_details') != null && this.cookieService.get('user_details') != '') {
          this.user_details = JSON.parse(this.cookieService.get('user_details'));
    
         // console.log(this.user_id);
          // console.log('type>>', this.user_details.type)
    
        }

    }

  ngOnInit() {

    if(this.router.url =='/job-ticket-admin' || this.router.url =='/job-ticket-salesrep' || this.router.url =='/job-ticket-customer'){
      this.activatedRoute.data.forEach((res)=>{
        // console.log(res.jobTicketList.res)
        this.jobTicketDataList=res.jobTicketList.res


    this.jobTicketList = new MatTableDataSource<JobTicket>(this.jobTicketDataList);


    //  this.jobTicketList = new MatTableDataSource(this.jobTicketDataList);
    setTimeout(() => {
      this.jobTicketList.paginator = this.jtPaginator;

    }, 500);
      })
    }


  }


  applyFilter(filterVal:any) {
    console.log(filterVal)
    // console.log(this.jobTicketList)
    this.jobTicketList.filter = filterVal.trim().toLowerCase();
    // console.log(this.jobTicketList)
  }



    //job ticket status filter
    statusFilterForJT(val:any){
      // console.log(val)
  
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
        // this.rsvp_list=result.res;
        // console.log(this.rsvp_list)
        setTimeout(() => {
          this.jobTicketList = new MatTableDataSource<JTElement>(this.jobTicketDataList);
          this.jobTicketList.paginator = this.jtPaginator;
    
        }, 500);
      })
  
    }

    clear(){
      this.filterVal = '';
      this.filterValstatus=''
      setTimeout(() => {
        this.jobTicketList = new MatTableDataSource<JTElement>(this.jobTicketDataList);
        this.jobTicketList.paginator = this.jtPaginator;
  
      }, 500);

      }

    

   //delete JobTicket record
   deleteJobTicket(val:any,index:any){
    // console.log('delete hit',val,index)
    const dialogRef = this.dialog.open(DeleteJobModalComponent, {
      width: '250px',
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
                this.jobTicketList = new MatTableDataSource<JobTicket>(this.jobTicketDataList);

                this.snack.open('Record Deleted Successfully..!','Ok',{duration:2000})
                
              }
            })
        }
    });
  }

  // load more function 
  loadMore(){
    this.indexVal=this.indexVal+2;
  }

  viewDetails(item:any,status:any){
    // console.log(item)
    
    this.router.navigateByUrl('/manage-job-ticket/add/'+item.rsvp_id+'/'+status)
  }


 displayedColumns4 = ['ticket', 'car_image', 'name', 'repName', 'customerName', 'subject', 'date', 'status', 'action'];
  // dataSource4 = new MatTableDataSource<JTElement>(JobTicket_DATA);

   
  @ViewChild('paginator4', {static: false}) paginator4: MatPaginator;


 

  ngAfterViewInit1() {
    this.jobTicketList.paginator = this.paginator4;
  }


  _setCommunicationDataSource(indexNumber) {
    setTimeout(() => {
      switch (indexNumber) {        
        case 1:
          !this.jobTicketList.paginator ? this.jobTicketList.paginator = this.paginator4 : null;
      }
    });
  }


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


//modal component for delete


@Component({
  selector:'deleteJobModal',
  templateUrl:'./deleteJobModal.html'
})
export class DeleteJobModalComponent {
  constructor( public dialogRef: MatDialogRef<DeleteJobModalComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData){

  }
}




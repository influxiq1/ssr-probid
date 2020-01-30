import { Component, OnInit,Inject,ViewChild} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from "@angular/material";
import { Router ,ActivatedRoute} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from '../../../api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MetaService } from '@ngx-meta/core';
import {MatSort} from '@angular/material/sort';


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
  status: string;
  action: string;
}


@Component({
  selector: 'app-job-ticket',
  templateUrl: './job-ticket.component.html',
  styleUrls: ['./job-ticket.component.css']
})
export class JobTicketComponent implements OnInit {



  JTColumns: string[] = ['ticket', 'name', 'repName', 'customerName',  'subject', 'status', 'action'];
  // jobTicketDataSource = new MatTableDataSource<JobTicket>(JobTicket_DATA);
  @ViewChild(MatPaginator, {static: false}) jtPaginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

public jobTicketDataList:any;
public indexVal:any=4;
public message:any="Are you sure you want to delete this?";
public jobTicketList:any;





  constructor(public router: Router,public activatedRoute:ActivatedRoute,
    public apiService: ApiService,
    public dialog: MatDialog,
    public snack:MatSnackBar, private readonly meta: MetaService) 
    { 
      this.meta.setTitle('ProBid Auto - Job Ticket');
        this.meta.setTag('og:title', 'ProBid Auto - Job Ticket');
        this.meta.setTag('twitter:title', 'ProBid Auto - Job Ticket');
        this.meta.setTag('og:type', 'website');
        this.meta.setTag('og:image', '../../assets/images/logomain.png');
        this.meta.setTag('twitter:image', '../../assets/images/logomain.png');
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




import { Component, OnInit,Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from "@angular/material";
import { Router ,ActivatedRoute} from '@angular/router';

import { ApiService } from '../../../api.service';
import {MatSnackBar} from '@angular/material/snack-bar';


export interface DialogData {
  data: any;
  msg:any;
} 


@Component({
  selector: 'app-job-ticket',
  templateUrl: './job-ticket.component.html',
  styleUrls: ['./job-ticket.component.css']
})
export class JobTicketComponent implements OnInit {

public jobTicketDataList:any;
public indexVal:any=4;
public message:any="Are you sure you want to delete this?";




  constructor(public router: Router,public activatedRoute:ActivatedRoute,
    public apiService: ApiService,
    public dialog: MatDialog,
    public snack:MatSnackBar) 
    { }

  ngOnInit() {

    this.activatedRoute.data.forEach((res)=>{
      console.log(res.jobTicketList.res)
      this.jobTicketDataList=res.jobTicketList.res

    })
    
  }

   //delete JobTicket record
   deleteJobTicket(val:any,index:any){
    console.log('delete hit',val,index)
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
                this.jobTicketDataList.splice(index,index+1);
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
    console.log(item)
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




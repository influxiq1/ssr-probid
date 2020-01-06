import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MetaService } from '@ngx-meta/core';


export interface DialogData {
  data: any;
  msg: any;
}

@Component({
  selector: 'app-mysalesrep',
  templateUrl: './mysalesrep.component.html',
  styleUrls: ['./mysalesrep.component.css']
})
export class MysalesrepComponent implements OnInit {

  
  public rsvp_list: any = '';
  public datalist: any = '';  
  public indexval:number=3;
  public message: any = "Are you sure you want to delete this?";

  constructor(private readonly meta: MetaService, public ApiService: ApiService, public cookieService: CookieService, public activatedRoute: ActivatedRoute, public apiService: ApiService, public http: HttpClient, public dialog: MatDialog, public snack: MatSnackBar, public router: Router) {


    
    this.meta.setTitle('My Sales Rep dynamic');
    this.meta.setTag('og:description', 'This is dynamic decription ');
    this.meta.setTag('og:title', 'This is dynamic title with meta og ');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', 'https://upload.wikimedia.org/wikipedia/commons/f/f8/superraton.jpg');


   }

  ngOnInit() {
    this.activatedRoute.data.forEach((data:any) => {
      // console.log(data)
      this.rsvp_list = data.rsvp.res;
      // console.log('rsvp>>',this.rsvp_list)
    })
  }

  changeStatus(item: any, val: any) {
    console.log('rsvpSend status',item, val)
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
        this.getdata();
      });
  }
  
  getdata() {
    let data: any = {
      endpoint: 'datalist',
      source: 'send_rsvp_view',
      // condition: {
      //   "added_by_object":  this.userid
      // }
    }
    this.apiService.getDatalist(data).subscribe((res:any)=>{
      this.rsvp_list = res.res;
      console.log('>>>>',this.rsvp_list);
    });
  }


  //delete rsvp record


  deleteRsvp(item:any,index:any){
    console.log('delete hit',item,index)
    const dialogRef = this.dialog.open(RemoveSalesRepRSvpModalComponent, {
      width: '250px',
      data:this.message

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      
        if(result=='yes'){
          let data:any;
            data={
            "source":"send_for_rsvp",
            id:item._id
            }
            this.apiService.CustomRequest(data,'deletesingledata').subscribe((res)=>{
              let result:any;
              result=res;
              console.log('success',result)
              
              if(result.status=='success'){
                this.rsvp_list.splice(index,index+1);
                this.snack.open('Record Deleted Successfully..!','Ok',{duration:2000})
                
              }
            })
        }
    });
  }



}



//modal component for delete RSVP


@Component({
  selector: 'app-removeRsvpModal',
  templateUrl: './removeRsvpModal.html'
})
export class RemoveSalesRepRSvpModalComponent {
  constructor(public dialogRef: MatDialogRef<RemoveSalesRepRSvpModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }
}

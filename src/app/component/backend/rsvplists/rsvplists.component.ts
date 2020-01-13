import { Component, OnInit,Inject} from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { ApiService } from '../../../api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from "@angular/material";
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';


export interface DialogData {
  data: any;
  msg:any;
} 

export interface DialogData1 {
  data: any;
  topPart:any;
  flag:any;
  heading:string;
  added_by_fullname: string;
  added_for_fullname: string;
  highest_bid: string;
} 

@Component({
  selector: 'app-rsvplists',
  templateUrl: './rsvplists.component.html',
  styleUrls: ['./rsvplists.component.css']
})
export class RsvplistsComponent implements OnInit {
public type: any;
public rsvp_list: any = '';
public indexval:any=4;
public ststus: number;
public message:any="Are you sure you want to delete this?";
public userCookies: any;
public userid: any;
public topPart: any ='';
  constructor(
    public activatedRoute: ActivatedRoute,
    public apiService: ApiService,
    public dialog: MatDialog,
    public snack:MatSnackBar,
    public cookieservice: CookieService,
    public router:Router) {

      if (this.cookieservice.get('user_details') != undefined && this.cookieservice.get('user_details') != null && this.cookieservice.get('user_details') != '') {
        this.userCookies = JSON.parse(this.cookieservice.get('user_details'));
        this.userid = this.userCookies._id;
        // console.log('>>>>',this.userCookies)   
        }
     }

  ngOnInit() {
    this.activatedRoute.data.forEach((data:any) => {
      // console.log(data)
      this.rsvp_list = data.rsvp.res;
      // console.log('rsvp>>',this.rsvp_list)
    })

    // this.getdata();
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
  selectOption(val:any){
    // console.log(val);
    // console.log(this.rsvp_list)
let data:any;
if (val !='') {
    data={
      endpoint:'datalist',
      source:"send_rsvp_view",
      condition:{
        "status":Number(val)
            }
       }
      }
      else{
        data={
        endpoint:'datalist',
      source:"send_rsvp_view"
        }
      }
      //  console.log(data)
    this.apiService.getDatalist(data).subscribe((res)=>{
      let result:any
      result=res
      this.rsvp_list=result.res;
      // console.log(this.rsvp_list)
    })
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
      // console.log('>>>>',this.rsvp_list);
    });
  }

  openModale(data:any){
    // console.log(data)
    const dialogRef = this.dialog.open(askForconfirmationModalComponent, {
      width: '250px',
      data:data

    });
    dialogRef.afterClosed().subscribe((result:any) => {
      // console.log(result);

      let carData:any={
        vehicle: result.heading,
        salesrep: result.added_by_fullname,
        customer: result.added_for_fullname,
        salesrep_email: result.added_by_email,
        customer_email: result.added_for_email,
        topPart: result.topPart,
        highest_bid: result.highest_bid,
        status: 3

      }

      if(result.flag == 'yes' ){

      let endpoint: any = "addorupdatedatawithouttoken";
    
        let data: any = {
          data: carData,  
          source: "ask_for_confirmation",
        };
          this.apiService.CustomRequest(data, endpoint).subscribe((res:any) => {
            (res.status == "success");
            // console.log(res)
          });
        } else {
          // console.log('No..!')
        }

        });
  }


  //delete rsvp record
  deleteRsvp(item:any,index:any){
    // console.log('delete hit',item,index)
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '250px',
      data:this.message

    });

    dialogRef.afterClosed().subscribe(result => {
      
        if(result=='yes'){
          let data:any;
            data={
            "source":"send_for_rsvp",
            id:item._id
            }
            this.apiService.CustomRequest(data,'deletesingledata').subscribe((res)=>{
              let result:any;
              result=res;
              
              if(result.status=='success'){
                this.rsvp_list.splice(index,index+1);
                this.snack.open('Record Deleted Successfully..!','Ok',{duration:2000})
                
              }
            })
        }
    });
  }

  loadMoreRsvp(){
    this.indexval=this.indexval+2;
  }

  goToopenTicket(item: any){
    console.log(item);
    this.router.navigateByUrl('/manage-job-ticket/add/'+item._id)
  }

  rsvpViewDetails(val:any){
    // console.log('>>>',val)
    

  }

  rsvpDetail(val:any){
    // console.log('hit',val)
    this.router.navigateByUrl('/rsvp-detail/'+val);
  }
}

//modal component for delete


@Component({
  selector:'app-deleteModal',
  templateUrl:'./deleteModal.html'
})
export class DeleteModalComponent {
  constructor( public dialogRef: MatDialogRef<DeleteModalComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData){

  }
}


@Component({
  selector:'app-askForconfirmationModal',
  templateUrl:'./askForconfirmationModal.html'
})
export class askForconfirmationModalComponent {
  public editorconfig: any = [];
public topPart: any =''; 
public highest_bid: any = '';
public flagVal:any = 1;

  constructor( public dialogRef: MatDialogRef<askForconfirmationModalComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData1, public fb:FormBuilder, public apiService: ApiService, public _sanitizer: DomSanitizer){
               this.editorconfig.extraAllowedContent = '*[class](*),span;ul;li;table;td;style;*[id];*(*);*{*}';
  }

  submitform(val: any, flag: string, val1: any){
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

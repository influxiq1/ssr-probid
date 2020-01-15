import { Component, OnInit} from '@angular/core';
import { ActivatedRoute ,Router, Route} from '@angular/router';
import { ApiService } from '../../../api.service';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-manage-jobticket',
  templateUrl: './manage-jobticket.component.html',
  styleUrls: ['./manage-jobticket.component.css']
})
export class ManageJobticketComponent implements OnInit {

  public rsvp_list: any = '';
  public jobTicketForm: FormGroup;
  public jobTicketMsgForm: FormGroup;
  public images_array:any=[];
  public images_arr:any=[];
  public showbox:any = 0;
  // for job ticket 
  public configData: any = {
    baseUrl: "https://fileupload.influxhostserver.com/",
    endpoint: "uploads",
    size: "51200", // kb
    format:["jpg", "jpeg", "png", "bmp", "zip", 'html'],  // use all small font
    type: "jobTicket-picture",
    path: "jobTicketImage",
    prefix: "jobTicket-picture",
    formSubmit: false,
    conversionNeeded: 0,
    bucketName: "probidfiles-dev.com" 
  }


// job ticket message 

public configDataJobTicket: any = {
  baseUrl: "https://fileupload.influxhostserver.com/",
  endpoint: "uploads",
  size: "51200", // kb
  format:["jpg", "jpeg", "png", "bmp", "zip", 'html'],  // use all small font
  type: "jobTicket-img-picture",
  path: "jobTicketImgPicture",
  prefix: "jobTicket-img-picture",
  formSubmit: false,
  conversionNeeded: 0,
  bucketName: "probidfiles-dev.com" 
}

  public userCookies: any;
  public userid: any;
  public rsvp_id: any;
  public status: any;
  public contract_details: any = '';
  public message_details: any = '';
  public user_list:any = '';
  public job_ticket: any = '';
  public rsvp_details: any = '';
  constructor( public activatedRoute: ActivatedRoute, public apiService: ApiService,  public cookieservice: CookieService,  public router:Router, public fb:FormBuilder, public apploader: AppComponent) {
    this.rsvp_id = activatedRoute.snapshot.params['_id'];
    this.status = activatedRoute.snapshot.params['status'];
    console.log(this.rsvp_id, this.status)
    if (this.cookieservice.get('jwtToken') != undefined  && this.cookieservice.get('user_details') != null && this.cookieservice.get('jwtToken') != null && this.cookieservice.get('jwtToken') != '') {
      this.userCookies = JSON.parse(this.cookieservice.get('user_details'));
      this.userid = this.userCookies._id;
      }
    this.jobTicketForm = this.fb.group({
      subject:['',Validators.required],
      description:['',Validators.required],
      jobTicket_picture:['', []],
        // message: ['',Validators.required],
    });

    this.jobTicketMsgForm = this.fb.group({
      message: ['',Validators.required],
      msg_picture:['', []],
    })
  }

  ngOnInit() {
    this.activatedRoute.data.forEach((data:any) => {
      console.log(data.job_ticket.result)
      this.message_details = data.job_ticket.result.message_details;
      this.user_list = data.job_ticket.result.user_list[0];
      this.rsvp_details = data.job_ticket.result.rsvp_details[0];
      this.job_ticket = data.job_ticket.result.job_ticket[0];
      console.log(this.job_ticket)
    })
    

    // this.getData();

  }
  showMessage(){
    this.showbox = 1;
  }
  getData(){
    // this.apploader.loader = 1;
    let dataType: any;
    if (this.status == 1) {
      dataType = { "source": 'job_ticket_msg_view', condition: { "rsvp_id_object": this.rsvp_id} };
    } 

    this.apiService.CustomRequest(dataType, "datalist").subscribe((res:any) => {
      console.log(res.res)
      this.message_details = res.res;
      this.apploader.loader = 0;

    })

  }

  jobTicketMsgFormSubmit(){
    for (let x in this.jobTicketMsgForm.controls) {
      this.jobTicketMsgForm.controls[x].markAsTouched();
    }

   // if (this.configDataJobTicket.files.length > 0) {
    for (const loop in this.configDataJobTicket.files) {
      this.images_arr =
        this.images_arr.concat({
          "upload_server_id": this.configDataJobTicket.files[loop].upload.data._id,
          "basepath": this.configDataJobTicket.files[loop].upload.data.basepath + '/' + this.configDataJobTicket.path + '/',
          "fileservername": this.configDataJobTicket.files[loop].upload.data.data.fileservername,
          "name": this.configDataJobTicket.files[loop].name,
          "type": this.configDataJobTicket.files[loop].type,
          "bucketname": this.configDataJobTicket.bucketName
        });
    }

    this.jobTicketMsgForm.controls['msg_picture'].patchValue(this.images_arr);



    if (this.jobTicketMsgForm.valid) {
      this.apploader.loader = 1;
      let endpoint: any = "addorupdatedata";
      let data: any = {
        source: "job_ticket_msg",
        data: {
          job_ticket_id:this.job_ticket._id,
          ticket_added_by: this.userid,
          rsvp_id:this.rsvp_id,
          message: this.jobTicketMsgForm.value.message,
          job_ticket:1,
          msg_picture:this.jobTicketMsgForm.value.msg_picture
        },
        sourceobj:["rsvp_id","ticket_added_by","job_ticket_id"]
      };

      this.apiService.CustomRequest(data, endpoint).subscribe(res => {
        console.log('>>>',res);
        this.showbox = 0;
        this.getData();
        this.jobTicketMsgForm.controls['message'].reset();
        this.apploader.loader = 0;
        
     
      })
    }

  }

  jobTicketFormSubmit(){
    for (let x in this.jobTicketForm.controls) {
      this.jobTicketForm.controls[x].markAsTouched();
    }
    // if (this.configData.files.length > 0) {
      for (const loop in this.configData.files) {
        this.images_array =
          this.images_array.concat({
            "upload_server_id": this.configData.files[loop].upload.data._id,
            "basepath": this.configData.files[loop].upload.data.basepath + '/' + this.configData.path + '/',
            "fileservername": this.configData.files[loop].upload.data.data.fileservername,
            "name": this.configData.files[loop].name,
            "type": this.configData.files[loop].type,
            "bucketname": this.configData.bucketName
          });
      }

      this.jobTicketForm.controls['jobTicket_picture'].patchValue(this.images_array);
    // }
    if (this.jobTicketForm.valid) {
      this.apploader.loader = 1;
      let endpoint: any = "addorupdatedata";
      let data: any = {
        source: "job_ticket",
        data: {
          ticket_added_by: this.userid,
          rsvp_id:this.rsvp_id,
          subject: this.jobTicketForm.value.subject,
          description: this.jobTicketForm.value.description,
          jobTicket_picture: this.jobTicketForm.value.jobTicket_picture,
          message: this.jobTicketForm.value.message,
          job_ticket:1
        },
        sourceobj:["rsvp_id","ticket_added_by"]
      };

      this.apiService.CustomRequest(data, endpoint).subscribe(res => {
        // console.log(res);
        // this.getData();
        // this.jobTicketForm.controls['message'].reset();
        this.router.navigateByUrl('/manage-job-ticket/add/'+this.rsvp_id+'/1')
        this.apploader.loader = 0;
        
     
      })
    }


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
  
  rsvpDetail(val:any){
    this.router.navigateByUrl('/rsvp-detail/'+val);
  }
  inputUntouched(val: any) {
    this.jobTicketForm.controls[val].markAsUntouched();
  }
  inputValUntouched(val: any) {
    this.jobTicketMsgForm.controls[val].markAsUntouched();
  }

}

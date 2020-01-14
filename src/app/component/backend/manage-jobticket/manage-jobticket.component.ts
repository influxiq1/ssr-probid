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
  public images_array:any=[];
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
  public userCookies: any;
  public userid: any;
  public rsvp_id: any;
  public status: any;
  public contract_details: any;
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
      jobTicket_picture:['', []]
    })
  }

  ngOnInit() {
    this.activatedRoute.data.forEach((data:any) => {
      this.rsvp_list = data.rsvp.res[0];
      console.log(data)
    })

    this.getData();

  }
  getData(){
    // this.apploader.loader = 1;
    let dataType: any;
    if (this.status != 1) {
    dataType = { "source": 'send_rsvp_view', condition: { "_id": this.rsvp_id} };
    } else {
      dataType = { "source": 'job_ticket_view', condition: { "rsvp_id_object": this.rsvp_id} };
    }

    this.apiService.CustomRequest(dataType, "datalist").subscribe((res:any) => {
      console.log(res.res)
      this.contract_details = res.res;
      // this.apploader.loader = 0;
      // console.log("@@>>>", this.rsvp_list[0].profile_picture);
    })

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
      let endpoint: any = "addorupdatedata";
      let data: any = {
        source: "job_ticket",
        data: {
          ticket_added_by: this.userid,
          rsvp_id:this.rsvp_id,
          subject: this.jobTicketForm.value.subject,
          description: this.jobTicketForm.value.description,
          jobTicket_picture: this.jobTicketForm.value.jobTicket_picture,
          job_ticket:1
        },
        sourceobj:["rsvp_id","ticket_added_by"]
      };
      this.apploader.loader = 1;

      this.apiService.CustomRequest(data, endpoint).subscribe(res => {
        console.log(res);
        this.getData();
        this.apploader.loader = 0;
     
      })
    }


  }
  rsvpDetail(val:any){
    this.router.navigateByUrl('/rsvp-detail/'+val);
  }
  inputUntouched(val: any) {
    this.jobTicketForm.controls[val].markAsUntouched();
  }

}

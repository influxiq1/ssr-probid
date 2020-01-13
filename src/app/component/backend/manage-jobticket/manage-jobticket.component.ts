import { Component, OnInit} from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { ApiService } from '../../../api.service';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-jobticket',
  templateUrl: './manage-jobticket.component.html',
  styleUrls: ['./manage-jobticket.component.css']
})
export class ManageJobticketComponent implements OnInit {

  public rsvp_list: any = '';
  public jobTicketForm: FormGroup;
  // public userCookies: any;
  // public userid: any;

  constructor( public activatedRoute: ActivatedRoute, public apiService: ApiService,  public cookieservice: CookieService,  public router:Router, public fb:FormBuilder) {
    this.jobTicketForm = this.fb.group({
      subject:['',Validators.required],
      description:['',Validators.required]
    })
  }

  ngOnInit() {
    this.activatedRoute.data.forEach((data:any) => {
      this.rsvp_list = data.rsvp.res[0];
    })

  }

  jobTicketFormSubmit(){
    console.log('------')
    for (let x in this.jobTicketForm.controls) {
      this.jobTicketForm.controls[x].markAsTouched();
    }
    // console.log(this.addsalesrepForm.value);
    if (this.jobTicketForm.valid) {
      console.log(this.jobTicketForm.value)
    }

  }
  rsvpDetail(val:any){
    this.router.navigateByUrl('/rsvp-detail/'+val);
  }
  inputUntouched(val: any) {
    this.jobTicketForm.controls[val].markAsUntouched();
  }

}

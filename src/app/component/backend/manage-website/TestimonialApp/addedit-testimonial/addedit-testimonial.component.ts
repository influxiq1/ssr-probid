import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../../../../api.service';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-addedit-testimonial',
  templateUrl: './addedit-testimonial.component.html',
  styleUrls: ['./addedit-testimonial.component.css']
})
export class AddeditTestimonialComponent implements OnInit {
/* Config for add and edit start */

public user_details: any;
public header_text:any="Add Testimonial"

public configAddEdit: any = {
  action: "add",
  // endpoint: "https://63zzhpnoti.execute-api.us-east-1.amazonaws.com/production/api/addorupdatedata",
  endpoint: this.ApiService.serverUrlDemo + 'addorupdatedata',
  source: "testimonial",
  condition: {},
  defaultData: null,
  jwtToken: this.cookieService.get('jwtToken'),
  callBack: "testimonial-lists-admin",
  userData: { id: "18801017007", name: "Admin" },
}


public configData: any = {
  baseUrl: "https://fileupload.influxhostserver.com/",
  endpoint: "uploads",
  size: "51200", // kb
  format: ["jpg", "jpeg","png"], // use all small font
  type: "testimonial-image",
  path: "testimonial",
  prefix: "testimonial-image_",
  formSubmit: false,
  conversionNeeded: 0,
  bucketName: "crmfiles.influxhostserver"
}

/**audio config */
public configAudioFileUpload:any={
  baseUrl: "https://fileupload.influxhostserver.com/",
  endpoint: "uploads",
  size: "51200", // kb
  format:["jpg", "jpeg", "png", "bmp", "zip", 'html','mp4','mp3','doc','ppt','pptx','pdf','msword'],  // use all small font
  type: "testimonial-mp3",
  path: "testimonial",
  prefix: "testimonial-mp3_",
  formSubmit: false,
  conversionNeeded: 1,
  bucketName: "probidfiles-dev.com"
}

/* Config for add and edit end */

  constructor( private router : Router , private activatedRoute : ActivatedRoute ,private cookieService : CookieService, public ApiService: ApiService, private readonly meta: MetaService) {

    this.meta.setTitle('ProBid Auto - Add Edit Testimonial');
    this.meta.setTag('og:title', 'ProBid Auto - Add Edit Testimonial');
    this.meta.setTag('twitter:title', 'ProBid Auto - Add Edit Testimonial');
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
    this.activatedRoute.params.subscribe(params => {
      if(params._id) {
        this.activatedRoute.data.subscribe(resolveData => {
          this.header_text="Edit testimonial"
          this.configAddEdit.defaultData = resolveData.testimonialData.res[0];
          this.configAddEdit.action = "edit";
          this.configAddEdit.condition = { id: params._id };
        });
      }
    });
  }


}





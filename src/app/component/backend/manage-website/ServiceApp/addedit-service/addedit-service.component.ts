import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../../../../api.service';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-addedit-service',
  templateUrl: './addedit-service.component.html',
  styleUrls: ['./addedit-service.component.css']
})
export class AddeditServiceComponent implements OnInit {

  public user_details: any;
  public header_text:any="Add Service"

  public configAddEdit: any = {
    action: "add",
    endpoint: this.ApiService.serverUrlDemo + 'addorupdatedata',
    source: "services",
    condition: {},
    defaultData: null,
    jwtToken: this.cookieService.get('jwtToken'),
    callBack: "service-listing",
    userData: { id: "18801017007", name: "Admin" },
  }

  public configData: any = {
    baseUrl: "https://fileupload.influxhostserver.com/",
    endpoint: "uploads",
    size: "51200", // kb
    format: ["jpg", "jpeg","png"], // use all small font
    type: "service-image",
    path: "services",
    prefix: "service-image_",
    formSubmit: false,
    conversionNeeded: 0,
    bucketName: "crmfiles.influxhostserver"
  }

  public configData2: any = {
    baseUrl: "https://fileupload.influxhostserver.com/",
    endpoint: "uploads",
    size: "51200", // kb
    format: ["jpg", "jpeg","png"], // use all small font
    type: "additional_service-image",
    path: "services",
    prefix: "additional_service-image_",
    formSubmit: false,
    conversionNeeded: 0,
    bucketName: "crmfiles.influxhostserver"
  }



  constructor(private router : Router , private activatedRoute : ActivatedRoute ,private cookieService : CookieService, public ApiService: ApiService, private readonly meta: MetaService) {
    this.meta.setTitle('ProBid Auto - Add Edit Service');
    this.meta.setTag('og:title', 'ProBid Auto - Add Edit Service');
    this.meta.setTag('twitter:title', 'ProBid Auto - Add Edit Service');
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
          this.header_text="Edit Service"
          this.configAddEdit.defaultData = resolveData.data.res[0];
          this.configAddEdit.action = "edit";
          this.configAddEdit.condition = { id: params._id };
        });
      }
    });
  }

}



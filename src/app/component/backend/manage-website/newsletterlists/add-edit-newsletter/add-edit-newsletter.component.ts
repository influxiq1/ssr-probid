import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../../api.service';
import { environment } from '../../../../../../environments/environment';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-add-edit-newsletter',
  templateUrl: './add-edit-newsletter.component.html',
  styleUrls: ['./add-edit-newsletter.component.css']
  
})
export class AddEditNewsletterComponent implements OnInit {

  public user_details: any;

  public configAddEdit: any = {
    action: "add",
   
     endpoint: environment.API_URL+'/addorupdatedata',
     endpoint2: environment.API_URL,
    // endpoint: environment.API_URL+'addorupdatedata',
   // endpoint: this.apiservice.serverUrl + 'addorupdatedata',
    source: "newsletters",
    condition: {},
    defaultData: null,
    jwtToken: this.cookieService.get('jwtToken'),
    callBack: "newsletter-list",
    userData: { id: "18801017007", name: "Admin" },
    defaultDataAlways: null,
    group_table:'news_category',
    sender_table:'senders'

  
    
  }  
  
  constructor(public cookieService: CookieService, private activatedRoute: ActivatedRoute, public apiservice: ApiService, private readonly meta: MetaService) {
    // console.log('data',this.configAddEdit.endpoint );

    this.meta.setTitle('ProBid Auto - Add Edit Newsletter');
    this.meta.setTag('og:title', 'ProBid Auto - Add Edit Newsletter');
    this.meta.setTag('twitter:title', 'ProBid Auto - Add Edit Newsletter');
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
          this.configAddEdit.defaultData = resolveData.newsData.res[0];

          // console.log(">>>", this.configAddEdit.defaultData );
          this.configAddEdit.action = "edit";
          this.configAddEdit.condition = { id: params._id };

        });
      }
    });
  }

}



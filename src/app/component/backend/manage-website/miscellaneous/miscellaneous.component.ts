import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MetaService } from '@ngx-meta/core';
import { ApiService } from 'src/app/api.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-miscellaneous',
  templateUrl: './miscellaneous.component.html',
  styleUrls: ['./miscellaneous.component.css']
})
export class MiscellaneousComponent implements OnInit {
  public user_details:any;
  public contactUsData: any;
  public user_cookie: any;
  contactUsData_skip: any = ["_id", "created_at"];
  detail_skip_array: any = ["_id"]
  contactUsData_modify_header: any = {
    "locationname": "Name"
  };
  tableName: any = 'contactusForm';
  UpdateEndpoint: any = "addorupdatedata";
  deleteEndpoint: any = "deletesingledata";
  

  // status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  view: any = "contactusForm";

  constructor(public activatedRoute: ActivatedRoute,private readonly meta: MetaService, public apiService:ApiService,public cookieService:CookieService, public router: Router,public dialog:MatDialog) {

    this.meta.setTitle('ProBid Auto - Manage API');
    this.meta.setTag('og:title', 'ProBid Auto - Manage API');
    this.meta.setTag('twitter:title', 'ProBid Auto - Manage API');
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
    this.activatedRoute.data.subscribe(resolveData => {
      this.contactUsData = resolveData.data.res;
    });
  }


}

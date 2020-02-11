import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../../../../api.service';
import { MetaService } from '@ngx-meta/core';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public userCookies:any;
public manageTrainingList : any=[];
public serverDetails: any = {
  // "serverUrl": "https://9ozbyvv5v0.execute-api.us-east-1.amazonaws.com/production/api/",
  "serverUrl": this.ApiService.serverUrlDemo,
  "jwttoken": this.cookieService.get('jwtToken')
};
public formSource: any = {
  "source":'manage_lession_view',
  "endpoint": "addorupdatedata",
  "showEndpoint":"datalist",
  "formTitleName": 'Training Center'
}
  constructor(public activatedRoute : ActivatedRoute,public ApiService: ApiService, private cookieService: CookieService,private readonly meta: MetaService) { 

    this.meta.setTitle('ProBid Auto - Training Center');
    this.meta.setTag('og:title', 'ProBid Auto - Training Center');
    this.meta.setTag('twitter:title', 'ProBid Auto - Training Center');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', '../../assets/images/logomain.png');
    this.meta.setTag('twitter:image', '../../assets/images/logomain.png');

    
    if (this.cookieService.get('jwtToken') != undefined  && this.cookieService.get('user_details') != null && this.cookieService.get('jwtToken') != null && this.cookieService.get('jwtToken') != '') {
      this.userCookies = JSON.parse(this.cookieService.get('user_details'));
      // console.log('>>>>>>>',this.userCookies)
      }

  }

  ngOnInit() {
    this.activatedRoute.data.forEach(data => {
      let result: any;
      result = data.trainingdata.res;
      this.manageTrainingList = result;
      // this.manageTrainingList.jwtToken = this.cookieService.get('jwtToken');
      
    })
  }


}

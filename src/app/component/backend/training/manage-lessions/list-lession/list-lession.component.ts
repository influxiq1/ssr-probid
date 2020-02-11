import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../../../../api.service';
import { MetaService } from '@ngx-meta/core';


@Component({
  selector: 'app-list-lession',
  templateUrl: './list-lession.component.html',
  styleUrls: ['./list-lession.component.css']
})
export class ListLessionComponent implements OnInit {
  public userCookies: any;
public manageLessionList : any=[];
public manageTrainingList : any = [];
public editPageRoute : any="/manage-lesson/edit/";
public addPageRoute : any="/manage-lesson/add";
public manageQuizRoute:any="/manage-quiz/list/";
public serverDetails: any = {
  // "serverUrl": "https://9ozbyvv5v0.execute-api.us-east-1.amazonaws.com/production/api/",
  // "jwttoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1ODAyMDE1MzcsImlhdCI6MTU4MDExNTEzN30.EfP5ru45maD0LM9NDkGy7xgUUslVcV3ls-k8-Bid9qU"
  "serverUrl": this.ApiService.serverUrlDemo,
    "jwttoken": this.cookieService.get('jwtToken')
};
public formSource: any = {
  "source":'manage_lession',
  "endpoint": "deletesingledata",
  "searchEndpoint":"datalist",
  "associatedTrainingSourceName":"training_category_management",
  "statusUpdateEndpoint":"statusChange",
  "statusUpdateSourceName":"manage_lession",

}
public searchSourceName :any="manage_lession_view";
  constructor(public activatedRoute : ActivatedRoute,public ApiService: ApiService, private cookieService: CookieService,private readonly meta: MetaService) { 
    this.meta.setTitle('ProBid Auto - Manage Lessions');
        this.meta.setTag('og:title', 'ProBid Auto - Manage Lessions');
        this.meta.setTag('twitter:title', 'ProBid Auto - Manage Lessons');
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
      result = data.lessionData.res;
      this.manageLessionList = result;
      // console.log("dataaaa",this.manageLessionList);
      
    })
  }

}

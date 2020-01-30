import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../../../../api.service';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-listing-training',
  templateUrl: './listing-training.component.html',
  styleUrls: ['./listing-training.component.css']
})
export class ListingTrainingComponent implements OnInit {
public manageTrainingList : any = [];
public editPageRoute : any="/manage-training/edit/";
public addPageRoute : any="/manage-training/add";
public searchSourceName : any="training_category_management_view";
public serverDetails: any = {
  // "serverUrl": "https://9ozbyvv5v0.execute-api.us-east-1.amazonaws.com/production/api/",
  // "jwttoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1ODAyMDE1MzcsImlhdCI6MTU4MDExNTEzN30.EfP5ru45maD0LM9NDkGy7xgUUslVcV3ls-k8-Bid9qU"
  "serverUrl": this.ApiService.serverUrlDemo,
    "jwttoken": this.cookieService.get('jwtToken')
};
public formSource: any = {
  "source":'training_category_management',
  "endpoint": "deletesingledata",
  "searchEndpoint":"datalist",
  "statusUpdateEndpoint":"statusChange",
  "statusUpdateSourceName":"training_category_management",
}
  constructor(public activatedRoute : ActivatedRoute,public ApiService: ApiService, private cookieService: CookieService,private readonly meta: MetaService) { 
        this.meta.setTitle('ProBid Auto - Manage Training');
        this.meta.setTag('og:title', 'ProBid Auto - Manage Training');
        this.meta.setTag('twitter:title', 'ProBid Auto - Manage Training');
        this.meta.setTag('og:type', 'website');
        this.meta.setTag('og:image', '../../assets/images/logomain.png');
        this.meta.setTag('twitter:image', '../../assets/images/logomain.png');
  }

  ngOnInit() {
    this.activatedRoute.data.forEach(data => {
      let result: any;
      result = data.trainingdata.res;
      this.manageTrainingList = result;
      
    })
  }

}

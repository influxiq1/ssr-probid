import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../../../../api.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
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
  constructor(public activatedRoute : ActivatedRoute,public ApiService: ApiService, private cookieService: CookieService) { }

  ngOnInit() {
    this.activatedRoute.data.forEach(data => {
      let result: any;
      result = data.trainingdata.res;
      this.manageTrainingList = result;
      // this.manageTrainingList.jwtToken = this.cookieService.get('jwtToken');
      
    })
  }


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../../../../api.service';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-update-answer',
  templateUrl: './update-answer.component.html',
  styleUrls: ['./update-answer.component.css']
})
export class UpdateAnswerComponent implements OnInit {
public quizAnswerList : any=[];
public serverDetails: any = {
  // "serverUrl": "https://9ozbyvv5v0.execute-api.us-east-1.amazonaws.com/production/api/",
  // "jwttoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1ODAyMDE1MzcsImlhdCI6MTU4MDExNTEzN30.EfP5ru45maD0LM9NDkGy7xgUUslVcV3ls-k8-Bid9qU"
  "serverUrl": this.ApiService.serverUrlDemo,
    "jwttoken": this.cookieService.get('jwtToken')
};
public formSource: any = {
  "source":"quiz_answer",
  "endpoint": "addorupdatedata",
  "deleteendpoint": "deletesingledata",
  "showEndpoint":"datalist",
  "formTitleName": 'Training'
}
  constructor(public activatedRoute: ActivatedRoute,public ApiService: ApiService, private cookieService: CookieService,private readonly meta: MetaService) { 
    this.meta.setTitle('ProBid Auto - Update Answer');
    this.meta.setTag('og:title', 'ProBid Auto - Update Answer');
    this.meta.setTag('twitter:title', 'ProBid Auto - Update Answer');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', '../../assets/images/logomain.png');
    this.meta.setTag('twitter:image', '../../assets/images/logomain.png');
  }

  ngOnInit() {
    this.activatedRoute.data.forEach(data => {
      // console.log("update answer",data);
      let result: any;
      result = data.quizQuestionData.res;
      this.quizAnswerList = result;
    })
  }

}

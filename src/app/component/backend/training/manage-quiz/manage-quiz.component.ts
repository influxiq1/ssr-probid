import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../../../api.service';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-manage-quiz',
  templateUrl: './manage-quiz.component.html',
  styleUrls: ['./manage-quiz.component.css']
})
export class ManageQuizComponent implements OnInit {
  public quizQuestionList: any = [];
  public addPageRoute: any = "/manage-quiz/add/";
  public lessonPageRoute: any = "/manage-lession/list";
  public editPageRoute:any="/manage-quiz/edit/";
  public paramsId:any;
  // public updateAnswerRoute:any="/manage-quiz/update-answer/";
  public serverDetails: any = {
    // "serverUrl": "https://9ozbyvv5v0.execute-api.us-east-1.amazonaws.com/production/api/",
    // "jwttoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1ODAyMDE1MzcsImlhdCI6MTU4MDExNTEzN30.EfP5ru45maD0LM9NDkGy7xgUUslVcV3ls-k8-Bid9qU"
    "serverUrl": this.ApiService.serverUrlDemo,
    "jwttoken": this.cookieService.get('jwtToken')
  };
  public formSource: any = {
    "source":'quiz_question',
    "endpoint": "deletesingledata",
    "searchEndpoint":"datalist",
    "statusUpdateEndpoint":"statusChange",
    "statusUpdateSourceName":"quiz_question",
  }
  public addUpdateAnswerRoute:any={
    "addAnswerRoute":"/manage-quiz/add-answer/",
    "updateAnswerRoute":"/manage-quiz/update-answer/"
  }

  constructor(public activatedRoute: ActivatedRoute,public ApiService: ApiService, private cookieService: CookieService,private readonly meta: MetaService) { 
    this.meta.setTitle('ProBid Auto - Manage Quiz');
        this.meta.setTag('og:title', 'ProBid Auto - Manage Quiz');
        this.meta.setTag('twitter:title', 'ProBid Auto - Manage Quiz');
        this.meta.setTag('og:type', 'website');
        this.meta.setTag('og:image', '../../assets/images/logomain.png');
        this.meta.setTag('twitter:image', '../../assets/images/logomain.png');

    // console.log("idddd",this.activatedRoute.snapshot.params);
    this.paramsId = this.activatedRoute.snapshot.params.lesson_id_object;
  }

  ngOnInit() {
    this.activatedRoute.data.forEach(data => {
      let result: any;
      result = data.trainingdata.res;
      this.quizQuestionList = result;
    })
  }

}

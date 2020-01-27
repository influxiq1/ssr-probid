import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../../../../api.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  public quizQuestionSingleDataList:any=[];
  public lessonId:any
  public serverDetails: any = {
    // "serverUrl": "https://9ozbyvv5v0.execute-api.us-east-1.amazonaws.com/production/api/",
    // "jwttoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1ODAyMDE1MzcsImlhdCI6MTU4MDExNTEzN30.EfP5ru45maD0LM9NDkGy7xgUUslVcV3ls-k8-Bid9qU"
    "serverUrl": this.ApiService.serverUrlDemo,
    "jwttoken": this.cookieService.get('jwtToken')
  };
  public formSource: any = {
    "source":"quiz_question",
    "endpoint": "addorupdatedata",
    "showEndpoint":"datalist",
    "formTitleName": 'Training'
  }
  public listingPageRoute : any="/manage-quiz/list/";

  constructor(public activatedRoute: ActivatedRoute,public ApiService: ApiService, private cookieService: CookieService) { 
    this.lessonId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit() {
    if(this.activatedRoute.snapshot.params._id){
      this.activatedRoute.data.forEach(data => {
        let result: any;
        result = data.quizQuestionData.res;
        this.quizQuestionSingleDataList = result;
        console.log("kjjihsiuhdata",this.quizQuestionSingleDataList);
  
      })
    }
  
  }

}

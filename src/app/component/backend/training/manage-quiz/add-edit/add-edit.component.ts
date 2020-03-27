import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../../../../api.service';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  public userCookies: any;
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

  constructor(public router: Router, public activeroute: ActivatedRoute,public ApiService: ApiService, private cookieService: CookieService,private readonly meta: MetaService) { 

    this.meta.setTitle('ProBid Auto - Manage Answer');
    this.meta.setTag('og:title', 'ProBid Auto - Manage Answer');
    this.meta.setTag('twitter:title', 'ProBid Auto - Manage Answer');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', '../../assets/images/logomain.png');
    this.meta.setTag('twitter:image', '../../assets/images/logomain.png');

    this.lessonId = this.activeroute.snapshot.params.id;

    if (this.cookieService.get('jwtToken') != undefined  && this.cookieService.get('user_details') != null && this.cookieService.get('jwtToken') != null && this.cookieService.get('jwtToken') != '') {
      this.userCookies = JSON.parse(this.cookieService.get('user_details'));
      // console.log('>>>>>>>',this.userCookies)
      }

  }

  ngOnInit() {
    if(this.activeroute.snapshot.params._id){

      this.activeroute.data.forEach(data => {
        let result: any;
        result = data.quizQuestionData.res;
        this.quizQuestionSingleDataList = result;
        // console.log("kjjihsiuhdata",this.quizQuestionSingleDataList);
  
      })
    }
  
  }

  managequizlist(){
    this.router.navigateByUrl("/manage-quiz/list/" + this.activeroute.snapshot.params._id);
  }

}

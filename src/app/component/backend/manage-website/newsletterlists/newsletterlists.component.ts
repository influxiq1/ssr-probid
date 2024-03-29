
import { ApiService } from '../../../../api.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MetaService } from '@ngx-meta/core';

import { environment } from '../../../../../environments/environment';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { snackBarComponent } from 'login-lib-influxiq/lib/forget-password/forget-password.component';


import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-newsletterlists',
  templateUrl: './newsletterlists.component.html',
  styleUrls: ['./newsletterlists.component.css']
})
export class NewsletterlistsComponent implements OnInit {

  public myformsetting: FormGroup;

  public user_details:any;

  public indexval: any;
  public replyAddress:any;
  public BaseUrl: any = environment["API_URL"];

  public newsConfigForm: any = {
    apiBaseUrl: this.BaseUrl,
    listEndPoint: "datalist",
    datasource: "",
    tableName: "newsletters",
    updateurl: "addorupdatedata",
    editUrl: "newsletter/edit",
    jwtToken: "",
    deleteEndPoint: "deletesingledata",
    addLink: "newsletter/add",
    view: "newsletters_view"
  }



  public subscriptionForm: any = {
    apiBaseUrl: this.BaseUrl,
    listEndPoint: "datalist",
    datasource: "",
    tableName: "subscriptions",
    updateurl: "addorupdatedata",
    editUrl: "subscriber/add-group/edit/",
    jwtToken: "",
    deleteEndPoint: "deletesingledata",
    addLink: "subscriber/add",
    view: "subscriptions_view"

  }

  public subscriptionCatForm: any = {
    apiBaseUrl: this.BaseUrl,
    listEndPoint: "datalist",
    datasource: "",
    tableName: "news_category",
    updateurl: "addorupdatedata",
    editUrl: "subscriber-group/edit/",
    jwtToken: "",
    deleteEndPoint: "deletesingledata",
    addLink: "subscriber-group/add",
    view: "news_category_view"

  }






  public testEmailConfigForm: any = {
    apiBaseUrl: this.BaseUrl,
    listEndPoint: "datalist",
    datasource: "",
    tableName: "testemail",
    updateurl: "addorupdatedata",
    editUrl: "test/edit",
    jwtToken: "",
    deleteEndPoint: "deletesingledata",
    addLink: "/test/add",
    view: ""

  }



  public senderConfigForm: any = {
    // apiBaseUrl: "https://r245816wug.execute-api.us-east-1.amazonaws.com/dev/api/",
    apiUrl: this.BaseUrl,
    listEndPoint: "datalist",
    datasource: "",
    tableName: "senders",
    updateurl: "addorupdatedata",
    editUrl: "/sender/edit",
    jwtToken: "",
    deleteEndPoint: "deletesingledata",
    addLink: "/sender/add",
    view: ""

  }

  constructor(private readonly meta: MetaService, private router: Router, private activatedRoute: ActivatedRoute, private cookieService: CookieService,  public apiservice: ApiService, public fb: FormBuilder ,public snackBar:MatSnackBar) { 

this.meta.setTitle('ProBid Auto - Manage Newsletters');
this.meta.setTag('og:title', 'ProBid Auto - Manage Newsletters');
this.meta.setTag('twitter:title', 'ProBid Auto - Manage Newsletters');
this.meta.setTag('og:type', 'website');
this.meta.setTag('og:image', '../../assets/images/logomain.png');
this.meta.setTag('twitter:image', '../../assets/images/logomain.png');
this.meta.setTag('og:image', 'https://upload.wikimedia.org/wikipedia/commons/f/f8/superraton.jpg');


if (this.cookieService.get('user_details') != undefined && this.cookieService.get('user_details') != null && this.cookieService.get('user_details') != '') {
  this.user_details = JSON.parse(this.cookieService.get('user_details'));

 // console.log(this.user_id);
  // console.log('type>>', this.user_details.type)

}
    


    // SubscriptionsList

    let data: any = {
      source: "subscriptions_view",
      endpoint: "datalist"

    }
    this.apiservice.getDatalist(data).subscribe((result: any) => {
      this.subscriptionForm.datasource = result.res;
      this.subscriptionForm.jwtToken = cookieService.get('jwtToken');
      // console.log('>>>>>>>>>>>>koushik subscription>>>>>>>>>>>>>', this.subscriptionForm.datasource);
    });



    // SubscriptionsCATEGORYList

    let dataSubCat: any = {
      source: "news_category_view",
      endpoint: "datalist"

    }
    this.apiservice.getDatalist(dataSubCat).subscribe((result: any) => {
      this.subscriptionCatForm.datasource = result.res;
      this.subscriptionCatForm.jwtToken = cookieService.get('jwtToken');
      // console.log('>>>>>>>>>>>>koushik subscription Category>>>>>>>>>>>>>', this.subscriptionCatForm.datasource);
    });


    // testemail 

    let dataTestemail: any = {
      source: "testemail_view",
      endpoint: "datalist"

    }
    this.apiservice.getDatalist(dataTestemail).subscribe((result: any) => {
      this.testEmailConfigForm.datasource = result.res;
      this.testEmailConfigForm.jwtToken = cookieService.get('jwtToken');
    });



    // sender 

    let dataSenderapp: any = {
      source: "senders_view",
      endpoint: "datalist"

    }
    this.apiservice.getDatalist(dataSenderapp).subscribe((result: any) => {
      this.senderConfigForm.datasource = result.res;
      this.senderConfigForm.jwtToken = cookieService.get('jwtToken');
      //  console.log('>>>>>>>>>>>>amitavasender>>>>>>>>>>>>>', this.senderConfigForm.datasource);
    });



    this.myformsetting = this.fb.group({
      email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],

    })

  }

  ngOnInit() {
    // NewsletterList 

    this.activatedRoute.data.subscribe(resolveData => {
      this.newsConfigForm.datasource = resolveData.newsData.res;
      this.newsConfigForm.jwtToken = this.cookieService.get('jwtToken');
      // console.log('test', this.newsConfigForm.datasource);

    });
    this.getReplyData();

  }


  dosettingSubmit() {

    // console.log(this.myform.value);
    let x: any;
    for (x in this.myformsetting.controls) {
      this.myformsetting.controls[x].markAsTouched();
    }
    if (this.myformsetting.valid) {

      /**form value insert */
      let data = { "source": "send_newsletter_reply_address", data: this.myformsetting.value };
      this.apiservice.CustomRequest(data, 'addorupdatedata').subscribe(res => {
        let result: any = {};
        result = res;
        // console.log(result);
        if (result.status == 'success') {

          // this.myformsetting.reset();
          this.snackBar.open('Email Saved Successfully...!','OK', {
            duration: 3000,
          });

          this.getReplyData();

          // let data = {
          //   "source": "send_newsletter_reply_address_view"
          // };
          // this.apiservice.CustomRequest(data, 'datalist').subscribe(res => {
          //   let result: any={};
          //   result = res;
          //   this.replyAddress=result.res[0];
          //   // console.log(this.replyAddress)
          //   this.myformsetting.controls['email'].patchValue(this.replyAddress.email);
          //   })

      }
    
    })
  }
}


// editreplyaddress(){

// }





  /**blur function */
  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
    //console.log('on blur .....');
  }

  //for reply address
  getReplyData(){
    let data = {
      "source": "send_newsletter_reply_address_view"
    };
    this.apiservice.CustomRequest(data, 'datalist').subscribe(res => {
      let result: any={};
      result = res;
      this.replyAddress=result.res[0];
      // console.log(this.replyAddress)
      this.myformsetting.controls['email'].patchValue(this.replyAddress.email);
      })
  }

}



import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-lisitng-testemailapp',
  templateUrl: './lisitng-testemailapp.component.html',
  styleUrls: ['./lisitng-testemailapp.component.css']
})
export class LisitngTestemailappComponent implements OnInit {

  // public senderConfigForm: any = {
  //   apiBaseUrl: "https://r245816wug.execute-api.us-east-1.amazonaws.com/dev/api/",
  //   listEndPoint: "datalist",
  //   datasource: "",
  //   tableName: "senders",
  //   updateurl: "addorupdatedata",
  //   editUrl: "test/edit",
  //   jwtToken: "",
  //   deleteEndPoint: "deletesingledata",
  //   addLink: "/test/add",
  //   view: "testemail_view"

  // }
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private cookieService: CookieService, private readonly meta: MetaService) {

    this.meta.setTitle('ProBid Auto - Testimonialapp Listing');
    this.meta.setTag('og:title', 'ProBid Auto - Testimonialapp Listing');
    this.meta.setTag('twitter:title', 'ProBid Auto - Testimonialapp Listing');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', '../../assets/images/logomain.png');
    this.meta.setTag('twitter:image', '../../assets/images/logomain.png');

    // this.activatedRoute.data.subscribe(resolveData => {
    //   this.senderConfigForm.datasource = resolveData.testData.res;
    //   this.senderConfigForm.jwtToken = this.cookieService.get('jwtToken');

    // });
  }

  ngOnInit() {
  }

}
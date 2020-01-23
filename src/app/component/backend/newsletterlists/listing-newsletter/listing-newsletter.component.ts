import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-listing-newsletter',
  templateUrl: './listing-newsletter.component.html',
  styleUrls: ['./listing-newsletter.component.css']
})
export class ListingNewsletterComponent implements OnInit {
  // public newsConfigForm: any = {
  //   apiUrl: "https://r245816wug.execute-api.us-east-1.amazonaws.com/dev/api/",
  //   listEndPoint: "datalist",
  //   datasource: "",
  //   tableName: "newsletters",
  //   updateurl: "addorupdatedata",
  //   editUrl: "newsletter/edit",
  //   jwtToken: "",
  //   deleteEndPoint: "deletesingledata",
  //   addLink: "/newsletter/add",
  //   view: ""

  // }
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private cookieService: CookieService, private readonly meta: MetaService) {
    this.meta.setTitle('ProBid Auto - Newletter Listing');
    this.meta.setTag('og:title', 'ProBid Auto - Newletter Listing');
    this.meta.setTag('twitter:title', 'ProBid Auto - Newletter Listing');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', '../../assets/images/logomain.png');
    this.meta.setTag('twitter:image', '../../assets/images/logomain.png');
    // this.activatedRoute.data.subscribe(resolveData => {
    //   this.newsConfigForm.datasource = resolveData.newsData.res;
    //   this.newsConfigForm.jwtToken = this.cookieService.get('jwtToken');

    // });
  }

  ngOnInit() {
  }

}
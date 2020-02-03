import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-listing-subscription',
  templateUrl: './listing-subscription.component.html',
  styleUrls: ['./listing-subscription.component.css']
})
export class ListingSubscriptionComponent implements OnInit {

   /************** lib list setup start here *************/
  //  public subscriptionForm: any = {
  //   apiBaseUrl: "https://r245816wug.execute-api.us-east-1.amazonaws.com/dev/api/",
  //   listEndPoint: "datalist",
  //   datasource: "",
  //   tableName: "subscriptions",
  //   updateurl: "addorupdatedata",
  //   editUrl: "newsletter/add-group/edit/",
  //   jwtToken: "",
  //   deleteEndPoint: "deletesingledata",
  //   addLink: "",
  //   view: "subscriptions"

  // }
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private cookieService: CookieService,private readonly meta: MetaService) {

    // this.activatedRoute.data.subscribe(resolveData => {
    //   this.subscriptionForm.datasource = resolveData.subscriptionData.res;
    //   this.subscriptionForm.jwtToken = this.cookieService.get('jwtToken');

    // });

    this.meta.setTitle('ProBid Auto - Subscription Listing');
        this.meta.setTag('og:title', 'ProBid Auto - Subscription Listing');
        this.meta.setTag('twitter:title', 'ProBid Auto - Subscription Listing');
        this.meta.setTag('og:type', 'website');
        this.meta.setTag('og:image', '../../assets/images/logomain.png');
        this.meta.setTag('twitter:image', '../../assets/images/logomain.png');
  }

  ngOnInit() {
  }

}
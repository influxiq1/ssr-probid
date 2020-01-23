import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-listing-senderapp',
  templateUrl: './listing-senderapp.component.html',
  styleUrls: ['./listing-senderapp.component.css']
})
export class ListingSenderappComponent implements OnInit {

  // public senderConfigForm: any = {
  //   apiBaseUrl: "https://r245816wug.execute-api.us-east-1.amazonaws.com/dev/api/",
  //   listEndPoint: "datalist",
  //   datasource: "",
  //   tableName: "senders",
  //   updateurl: "addorupdatedata",
  //   editUrl: "sender/edit",
  //   jwtToken: "",
  //   deleteEndPoint: "deletesingledata",
  //   addLink: "/sender/add",
  //   view: "senders_view"

  // }
  constructor(private router: Router, private activatedRoute: ActivatedRoute, public cookieService: CookieService, private readonly meta: MetaService) {

    this.meta.setTitle('ProBid Auto - Senderapp Listing');
        this.meta.setTag('og:title', 'ProBid Auto - Senderapp Listing');
        this.meta.setTag('twitter:title', 'ProBid Auto - Senderapp Listing');
        this.meta.setTag('og:type', 'website');
        this.meta.setTag('og:image', '../../assets/images/logomain.png');
        this.meta.setTag('twitter:image', '../../assets/images/logomain.png');

    // this.activatedRoute.data.subscribe(resolveData => {
    //   this.senderConfigForm.datasource = resolveData.senderData.res;
    //   this.senderConfigForm.jwtToken = this.cookieService.getAll();

    // });
  }

  ngOnInit() {
  }

}
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-rsvp-success',
  templateUrl: './rsvp-success.component.html',
  styleUrls: ['./rsvp-success.component.css']
})
export class RsvpSuccessComponent implements OnInit {

  public getDataUrl: any = {
    endpoint: 'datalist',
    source: ''
  };
  public datalist: any = '';

  constructor(private readonly meta: MetaService, public ApiService: ApiService, public cookieService: CookieService, public activatedRoute: ActivatedRoute, public apiService: ApiService, public http: HttpClient, public dialog: MatDialog, public snack: MatSnackBar, public router: Router) {

    this.meta.setTitle('ProBid Auto - RSVP Success');
    this.meta.setTag('og:description', 'Revolutionizing the Online Auto Industry, ProBid Auto has re-invented the art of Buying and Selling Pre-Owned Vehicles Online, making it easier and more convenient for buyers to get the cars of their choices.');
    this.meta.setTag('twitter:description', 'Revolutionizing the Online Auto Industry, ProBid Auto has re-invented the art of Buying and Selling Pre-Owned Vehicles Online, making it easier and more convenient for buyers to get the cars of their choices.');

    this.meta.setTag('og:keyword', 'ProBid Auto, Buying Pre-Owned Vehicles Online, Selling Pre-Owned Vehicles Online');
    this.meta.setTag('twitter:keyword', 'ProBid Auto, Buying Pre-Owned Vehicles Online, Selling Pre-Owned Vehicles Online');

    this.meta.setTag('og:title', 'ProBid Auto - RSVP Success');
    this.meta.setTag('twitter:title', 'ProBid Auto - RSVP Success');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', '../../assets/images/logomain.png');
    this.meta.setTag('twitter:image', '../../assets/images/logomain.png');


   }

  ngOnInit() {
    this.activatedRoute.data.forEach((data: any) => {
      
      this.datalist = data.rsvp.res[0];
      console.log('dash-data', this.datalist)

    })
  }

}

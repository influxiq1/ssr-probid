import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-manage-availability',
  templateUrl: './manage-availability.component.html',
  styleUrls: ['./manage-availability.component.css']
})
export class ManageAvailabilityComponent implements OnInit {
  public userCookies:any;
  constructor(private readonly meta: MetaService, private cookieService: CookieService) { 
        this.meta.setTitle('ProBid Auto - Manage Availability');
        this.meta.setTag('og:title', 'ProBid Auto - Manage Availability');
        this.meta.setTag('twitter:title', 'ProBid Auto - Manage Availability');
        this.meta.setTag('og:type', 'website');
        this.meta.setTag('og:image', '../../assets/images/logomain.png');
        this.meta.setTag('twitter:image', '../../assets/images/logomain.png');

        if (this.cookieService.get('jwtToken') != undefined  && this.cookieService.get('user_details') != null && this.cookieService.get('jwtToken') != null && this.cookieService.get('jwtToken') != '') {
          this.userCookies = JSON.parse(this.cookieService.get('user_details'));
          // console.log('>>>>>>>',this.userCookies)
          }
  }

  ngOnInit() {
  }

}

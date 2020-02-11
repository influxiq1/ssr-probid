import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MetaService } from '@ngx-meta/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-blog-management',
  templateUrl: './blog-management.component.html',
  styleUrls: ['./blog-management.component.css']
})
export class BlogManagementComponent implements OnInit {

  public user_details: any;
  
  constructor(public router:Router, public activatedRoute: ActivatedRoute, private readonly meta: MetaService, public cookieService: CookieService) { 
    this.meta.setTitle('ProBid Auto - Manage Blogs');
    this.meta.setTag('og:title', 'ProBid Auto - Manage Blogs');
    this.meta.setTag('twitter:title', 'ProBid Auto - Manage Blogs');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', '../../assets/images/logomain.png');
    this.meta.setTag('twitter:image', '../../assets/images/logomain.png');

    if (this.cookieService.get('user_details') != undefined && this.cookieService.get('user_details') != null && this.cookieService.get('user_details') != '') {
      this.user_details = JSON.parse(this.cookieService.get('user_details'));

     // console.log(this.user_id);
      // console.log('type>>', this.user_details.type)

    }

  }

  ngOnInit() {

    
  }

}

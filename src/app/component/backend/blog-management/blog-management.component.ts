import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-blog-management',
  templateUrl: './blog-management.component.html',
  styleUrls: ['./blog-management.component.css']
})
export class BlogManagementComponent implements OnInit {

  constructor(public router:Router, public activatedRoute: ActivatedRoute, private readonly meta: MetaService) { 
    this.meta.setTitle('ProBid Auto - Blog Management');
    this.meta.setTag('og:title', 'ProBid Auto - Blog Management');
    this.meta.setTag('twitter:title', 'ProBid Auto - Blog Management');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', '../../assets/images/logomain.png');
    this.meta.setTag('twitter:image', '../../assets/images/logomain.png');
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-testimonial-lists-admin',
  templateUrl: './testimonial-lists-admin.component.html',
  styleUrls: ['./testimonial-lists-admin.component.css']
})
export class TestimonialListsAdminComponent implements OnInit {

  constructor(private readonly meta: MetaService) {

    this.meta.setTitle('ProBid Auto - Testimonial Lists');
    this.meta.setTag('og:title', 'ProBid Auto - Testimonial Lists');
    this.meta.setTag('twitter:title', 'ProBid Auto - Testimonial Lists');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', '../../assets/images/logomain.png');
    this.meta.setTag('twitter:image', '../../assets/images/logomain.png');
   }

  ngOnInit() {
  }

}

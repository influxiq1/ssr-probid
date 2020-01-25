import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-training-center',
  templateUrl: './training-center.component.html',
  styleUrls: ['./training-center.component.css']
})
export class TrainingCenterComponent implements OnInit {

  constructor(private readonly meta: MetaService) { 
    this.meta.setTitle('ProBid Auto - Training Center');
    this.meta.setTag('og:title', 'ProBid Auto - Training Center');
    this.meta.setTag('twitter:title', 'ProBid Auto - Training Center');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', '../../assets/images/logomain.png');
    this.meta.setTag('twitter:image', '../../assets/images/logomain.png');
  }

  ngOnInit() {
  }

}

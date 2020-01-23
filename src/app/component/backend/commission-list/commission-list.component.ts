import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-commission-list',
  templateUrl: './commission-list.component.html',
  styleUrls: ['./commission-list.component.css']
})
export class CommissionListComponent implements OnInit {

  constructor(private readonly meta: MetaService) {
    this.meta.setTitle('ProBid Auto - Commission List');
        this.meta.setTag('og:title', 'ProBid Auto - Commission List');
        this.meta.setTag('twitter:title', 'ProBid Auto - Commission List');
        this.meta.setTag('og:type', 'website');
        this.meta.setTag('og:image', '../../assets/images/logomain.png');
        this.meta.setTag('twitter:image', '../../assets/images/logomain.png');
   }

  ngOnInit() {
  }

}

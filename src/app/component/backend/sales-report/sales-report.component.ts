import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {

  constructor(private readonly meta: MetaService) {
    this.meta.setTitle('ProBid Auto - Sales Report');
    this.meta.setTag('og:title', 'ProBid Auto - Sales Report');
    this.meta.setTag('twitter:title', 'ProBid Auto - Sales Report');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', '../../assets/images/logomain.png');
    this.meta.setTag('twitter:image', '../../assets/images/logomain.png');
   }

  ngOnInit() {
  }

}

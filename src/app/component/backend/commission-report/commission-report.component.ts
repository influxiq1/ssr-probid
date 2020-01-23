import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-commission-report',
  templateUrl: './commission-report.component.html',
  styleUrls: ['./commission-report.component.css']
})
export class CommissionReportComponent implements OnInit {

  constructor(private readonly meta: MetaService) { 
    this.meta.setTitle('ProBid Auto - Commission Report');
        this.meta.setTag('og:title', 'ProBid Auto - Commission Report');
        this.meta.setTag('twitter:title', 'ProBid Auto - Commission Report');
        this.meta.setTag('og:type', 'website');
        this.meta.setTag('og:image', '../../assets/images/logomain.png');
        this.meta.setTag('twitter:image', '../../assets/images/logomain.png');
  }

  ngOnInit() {
  }

}

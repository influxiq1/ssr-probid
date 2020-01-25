import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-training-report',
  templateUrl: './training-report.component.html',
  styleUrls: ['./training-report.component.css']
})
export class TrainingReportComponent implements OnInit {

  constructor(private readonly meta: MetaService) { 

    this.meta.setTitle('ProBid Auto - Training Report');
    this.meta.setTag('og:title', 'ProBid Auto - Training Report');
    this.meta.setTag('twitter:title', 'ProBid Auto - Training Report');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', '../../assets/images/logomain.png');
    this.meta.setTag('twitter:image', '../../assets/images/logomain.png');
  }

  ngOnInit() {
  }

}

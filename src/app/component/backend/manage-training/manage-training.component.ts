import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-manage-training',
  templateUrl: './manage-training.component.html',
  styleUrls: ['./manage-training.component.css']
})
export class ManageTrainingComponent implements OnInit {

  constructor(private readonly meta: MetaService) { 
        this.meta.setTitle('ProBid Auto - Manage Training');
        this.meta.setTag('og:title', 'ProBid Auto - Manage Training');
        this.meta.setTag('twitter:title', 'ProBid Auto - Manage Training');
        this.meta.setTag('og:type', 'website');
        this.meta.setTag('og:image', '../../assets/images/logomain.png');
        this.meta.setTag('twitter:image', '../../assets/images/logomain.png');
  }

  ngOnInit() {
  }

}

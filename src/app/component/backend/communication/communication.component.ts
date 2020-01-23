import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css']
})
export class CommunicationComponent implements OnInit {

  constructor(private readonly meta: MetaService) { 
    this.meta.setTitle('ProBid Auto - Communication Report');
        this.meta.setTag('og:title', 'ProBid Auto - Communication Report');
        this.meta.setTag('twitter:title', 'ProBid Auto - Communication Report');
        this.meta.setTag('og:type', 'website');
        this.meta.setTag('og:image', '../../assets/images/logomain.png');
        this.meta.setTag('twitter:image', '../../assets/images/logomain.png');
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-manage-availability',
  templateUrl: './manage-availability.component.html',
  styleUrls: ['./manage-availability.component.css']
})
export class ManageAvailabilityComponent implements OnInit {

  constructor(private readonly meta: MetaService) { 
        this.meta.setTitle('ProBid Auto - Manage Availability');
        this.meta.setTag('og:title', 'ProBid Auto - Manage Availability');
        this.meta.setTag('twitter:title', 'ProBid Auto - Manage Availability');
        this.meta.setTag('og:type', 'website');
        this.meta.setTag('og:image', '../../assets/images/logomain.png');
        this.meta.setTag('twitter:image', '../../assets/images/logomain.png');
  }

  ngOnInit() {
  }

}

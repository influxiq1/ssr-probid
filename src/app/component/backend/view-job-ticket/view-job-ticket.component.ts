import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-view-job-ticket',
  templateUrl: './view-job-ticket.component.html',
  styleUrls: ['./view-job-ticket.component.css']
})
export class ViewJobTicketComponent implements OnInit {

  constructor(private readonly meta: MetaService) {
    this.meta.setTitle('ProBid Auto - View Job Ticket');
    this.meta.setTag('og:title', 'ProBid Auto - View Job Ticket');
    this.meta.setTag('twitter:title', 'ProBid Auto - View Job Ticket');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', '../../assets/images/logomain.png');
    this.meta.setTag('twitter:image', '../../assets/images/logomain.png');
   }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-manage-lessons',
  templateUrl: './manage-lessons.component.html',
  styleUrls: ['./manage-lessons.component.css']
})
export class ManageLessonsComponent implements OnInit {

  constructor(private readonly meta: MetaService) {
    this.meta.setTitle('ProBid Auto - Manage Lessions');
        this.meta.setTag('og:title', 'ProBid Auto - Manage Lessions');
        this.meta.setTag('twitter:title', 'ProBid Auto - Manage Lessons');
        this.meta.setTag('og:type', 'website');
        this.meta.setTag('og:image', '../../assets/images/logomain.png');
        this.meta.setTag('twitter:image', '../../assets/images/logomain.png');
   }

  ngOnInit() {
  }

}

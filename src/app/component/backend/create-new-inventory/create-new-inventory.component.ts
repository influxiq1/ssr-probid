import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-create-new-inventory',
  templateUrl: './create-new-inventory.component.html',
  styleUrls: ['./create-new-inventory.component.css']
})
export class CreateNewInventoryComponent implements OnInit {

  constructor(private readonly meta: MetaService) { 
    this.meta.setTitle('ProBid Auto - Create New Inventory');
        this.meta.setTag('og:title', 'ProBid Auto - Create New Inventory');
        this.meta.setTag('twitter:title', 'ProBid Auto - Create New Inventory');
        this.meta.setTag('og:type', 'website');
        this.meta.setTag('og:image', '../../assets/images/logomain.png');
        this.meta.setTag('twitter:image', '../../assets/images/logomain.png');
  }

  ngOnInit() {
  }

}

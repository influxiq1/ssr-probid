import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service';
import { MetaService } from '@ngx-meta/core';
@Component({
  selector: 'app-inventory-search',
  templateUrl: './inventory-search.component.html',
  styleUrls: ['./inventory-search.component.css']
})
export class InventorySearchComponent implements OnInit {

  constructor(public router: Router, public apiService: ApiService, private readonly meta: MetaService) { 
    this.meta.setTitle('ProBid Auto - Inventory Search');
        this.meta.setTag('og:title', 'ProBid Auto - Inventory Search');
        this.meta.setTag('twitter:title', 'ProBid Auto - Inventory Search');
        this.meta.setTag('og:type', 'website');
        this.meta.setTag('og:image', '../../assets/images/logomain.png');
        this.meta.setTag('twitter:image', '../../assets/images/logomain.png');
  }

  ngOnInit() {
    // console.log(this.router.url);
  }

}

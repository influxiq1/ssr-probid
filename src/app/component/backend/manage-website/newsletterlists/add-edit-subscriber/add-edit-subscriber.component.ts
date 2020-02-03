import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../../api.service';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-add-edit-subscriber',
  templateUrl: './add-edit-subscriber.component.html',
  styleUrls: ['./add-edit-subscriber.component.css']
})
export class AddEditSubscriberComponent implements OnInit {

  public configAddEdit: any = {
    action: "add",
    // endpoint: "https://r245816wug.execute-api.us-east-1.amazonaws.com/dev/api/addorupdatedata",
    // endpoint2: "https://r245816wug.execute-api.us-east-1.amazonaws.com/dev/api/",
    endpoint: this.ApiService.serverUrlDemo + 'addorupdatedata',
    endpoint2: this.ApiService.serverUrlDemo,
    source: "subscriptions",
    condition: {},
    defaultData: null,
    jwtToken: this.cookieService.get('jwtToken'),
    callBack: "newsletter-list",
    userData: { id: "18801017007", name: "Admin" },
    defaultDataAlways: null,
    group: 'news_category'
  }
  constructor(private cookieService: CookieService, private activatedRoute: ActivatedRoute, public ApiService: ApiService, private readonly meta: MetaService) {
    this.meta.setTitle('ProBid Auto - Add Edit Subscriber');
    this.meta.setTag('og:title', 'ProBid Auto - Add Edit Subscriber');
    this.meta.setTag('twitter:title', 'ProBid Auto - Add Edit Subscriber');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', '../../assets/images/logomain.png');
    this.meta.setTag('twitter:image', '../../assets/images/logomain.png');
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params._id) {
        this.activatedRoute.data.subscribe(resolveData => {
          this.configAddEdit.defaultData = resolveData.subscriptiongroupData.res[0];
          this.configAddEdit.action = "edit";
          this.configAddEdit.condition = { id: params._id };
        });
      }
    });
  }

}

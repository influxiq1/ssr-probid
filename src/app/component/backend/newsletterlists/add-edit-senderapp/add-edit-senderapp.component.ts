import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../api.service';
import { MetaService } from '@ngx-meta/core';
@Component({
  selector: 'app-add-edit-senderapp',
  templateUrl: './add-edit-senderapp.component.html',
  styleUrls: ['./add-edit-senderapp.component.css']
})
export class AddEditSenderappComponent implements OnInit {



  public configAddEditSender: any = {
    action: "add",
    endpoint: this.ApiService.serverUrlDemo + 'addorupdatedata',
    endpoint2: this.ApiService.serverUrlDemo,
    source: "senders",
    condition: {},
    defaultData: null,
    jwtToken: this.cookieService.get('jwtToken'),
    callBack: "/newsletter-list",
    userData: { id: "18801017007", name: "Admin" },
    defaultDataAlways: null
  }


  constructor(private cookieService: CookieService, private activatedRoute: ActivatedRoute, public ApiService: ApiService, private readonly meta: MetaService) {
    this.meta.setTitle('ProBid Auto - Add Edit Senderapp');
    this.meta.setTag('og:title', 'ProBid Auto - Add Edit Senderapp');
    this.meta.setTag('twitter:title', 'ProBid Auto - Add Edit Senderapp');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', '../../assets/images/logomain.png');
    this.meta.setTag('twitter:image', '../../assets/images/logomain.png');
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params._id) {
        this.activatedRoute.data.subscribe(resolveData => {
          this.configAddEditSender.defaultData = resolveData.senderData.res[0];
          this.configAddEditSender.action = "edit";
          this.configAddEditSender.condition = { id: params._id };
        });
      }
    });
  }

}
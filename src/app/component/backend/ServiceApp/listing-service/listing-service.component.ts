import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../../../api.service';
import { MetaService } from '@ngx-meta/core';



@Component({
  selector: 'app-listing-service',
  templateUrl: './listing-service.component.html',
  styleUrls: ['./listing-service.component.css']
})
export class ListingServiceComponent implements OnInit {

    /************** lib list setup start here *************/
    public serviceListConfig:any = {
      apiBaseUrl: this.ApiService.serverUrlDemo,
      listEndPoint: "datalist",
      datasource: '',
      tableName: "services",
      updateurl: "addorupdatedata",
      editUrl: "service/edit",
      jwtToken: '',
      deleteEndPoint: "deletesingledata",
      addLink: "/service/add",
      view:"services_view"
    }

    
  
  constructor( private router: Router, private activatedRoute: ActivatedRoute, private cookieService: CookieService, public ApiService: ApiService,private readonly meta: MetaService ) { 

    this.meta.setTitle('ProBid Auto - Service Lists');
    this.meta.setTag('og:title', 'ProBid Auto - Service Lists');
    this.meta.setTag('twitter:title', 'ProBid Auto - Service Lists');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', '../../assets/images/logomain.png');
    this.meta.setTag('twitter:image', '../../assets/images/logomain.png'); 
}

  ngOnInit() {

    /** calling the servce data **/
    this.onServiceDataPopulate();
  }

  /** populating the service data **/
  onServiceDataPopulate(){
    this.activatedRoute.data.subscribe(resolveData => {
      this.serviceListConfig.datasource = resolveData.data.res;
      this.serviceListConfig.jwtToken = this.cookieService.get('jwtToken');      
    });
  }

}


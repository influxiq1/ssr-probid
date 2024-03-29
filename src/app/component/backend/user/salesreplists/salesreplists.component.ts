import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../api.service';
import { CookieService } from 'ngx-cookie-service';
import { MetaService } from '@ngx-meta/core';
@Component({
  selector: 'app-salesreplists',
  templateUrl: './salesreplists.component.html',
  styleUrls: ['./salesreplists.component.css']
})
export class SalesreplistsComponent implements OnInit {

  public userDetails:any;
  public userType:any;
  
    statusarray: any = [{val: 1, name: 'Active'}, {val: 0, name: 'pending'}, {val: 2, name: 'Inactive'}]; 

    pendingmodelapplicationarray: any = [];
  pendingmodelapplicationarray_skip: any = ['_id','password','timezone','webiner','username','zip','created_at','type','state','city','salesrep_id','salesrep_fullname'];
  pendingmodelapplicationarray_detail_skip: any = ['_id'];

    updateendpoint = 'addorupdatedata';
    deleteendpoint = 'deletesingledata';

    tablename = 'user';

    searchendpoint = 'datalist';
    editroute: any = 'editsalesrep';
    modify_header_array: any = {
      'fullname': "Name",
      'phone': "Phone",
      'email':"Email",
      'address':'Location',
      'date added':'Date',
      'companyname':'Company'
    };

     // this is use for  All type of search 
     search_settings:any={

      datesearch:[{startdatelabel:"Start Date",enddatelabel:"End Date",submit:"Search By Date",  field:"created_at"}],   // this is use for  date search 

      textsearch:[{label:"Search By email",field:'email'},{label:"Search By Full name",field:'name'}],  // this is use for  text search

      search:[{label:"Search By autocomplete",field:'name'}]     // this is use for  Autocomplete search
  }

  constructor(public activatedRoute: ActivatedRoute, public router: Router,public apiService: ApiService, public cookieService: CookieService, private readonly meta: MetaService) {
    this.meta.setTitle('ProBid Auto - SalesRep List');
    this.meta.setTag('og:title', 'ProBid Auto - SalesRep List');
    this.meta.setTag('twitter:title', 'ProBid Auto - SalesRep List');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', '../../assets/images/logomain.png');
    this.meta.setTag('twitter:image', '../../assets/images/logomain.png');

    this.userDetails = JSON.parse(this.cookieService.get('user_details'));
    this.userType=this.userDetails.type;


   }

  ngOnInit() {
    this.activatedRoute.data.forEach(data=>{   
      // console.log(data.salesreplist.res);
      this.pendingmodelapplicationarray=data.salesreplist.res;
    })
  }

}

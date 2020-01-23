import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
//   public user_management_ditiles: any = [];
//   public user_management_ditiles_skip: any = ['password','_id'];
//   public user_management_ditiles_modify_header: any = {
//     'email': 'Email Id',
//     '_id': "ID"
// };
// public tablename: any= 'user';

  constructor(public route: ActivatedRoute, public apiService: ApiService, private readonly meta: MetaService) { 
    this.meta.setTitle('ProBid Auto - User Management');
    this.meta.setTag('og:title', 'ProBid Auto - User Management');
    this.meta.setTag('twitter:title', 'ProBid Auto - User Management');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', '../../assets/images/logomain.png');
    this.meta.setTag('twitter:image', '../../assets/images/logomain.png');
  }

  ngOnInit() {
    // this.route.data.forEach(data =>{
    //   let result:any;
    //   result=data.serviceList.res;
    //   this.user_management_ditiles = result;
    //   console.log(this.user_management_ditiles.length)
    //   console.log(this.user_management_ditiles)
    // })
  }

}

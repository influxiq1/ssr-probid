import { Component, OnInit} from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { ApiService } from '../../../api.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-manage-jobticket',
  templateUrl: './manage-jobticket.component.html',
  styleUrls: ['./manage-jobticket.component.css']
})
export class ManageJobticketComponent implements OnInit {

  // public rsvp_list: any = '';
  // public userCookies: any;
  // public userid: any;

  constructor( public activatedRoute: ActivatedRoute, public apiService: ApiService,  public cookieservice: CookieService,  public router:Router) {}

  ngOnInit() {
    // this.activatedRoute.data.forEach((data:any) => {
    //   // console.log(data)
    //   this.rsvp_list = data.rsvp.res;
    //   // console.log('rsvp>>',this.rsvp_list)
    // })

  }

}

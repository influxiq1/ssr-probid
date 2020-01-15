import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-listing-testimonial',
  templateUrl: './listing-testimonial.component.html',
  styleUrls: ['./listing-testimonial.component.css']
})
export class ListingTestimonialComponent implements OnInit {

  image_detail_datatype: any;
  user_cookie:any;
  /************** lib list setup start here *************/
  // public testimonialListConfig:any = {
  //   // apiBaseUrl: "https://o820cv2lu8.execute-api.us-east-2.amazonaws.com/production/api/",
  //   apiBaseUrl: this.ApiService.serverUrlDemo,
  //   listEndPoint: "datalist",
  //   datasource: "",
  //   tableName: "testimonial_view",
  //   updateurl: "addorupdatedata",
  //   editUrl: "testimonial/edit",
  //   jwtToken: this.ApiService.accesstoken,
  //   deleteEndPoint: "deletesingledata",
  //   addLink: "/testimonial/add",
  //   view: "testimonial_view"
  // }




  // ===============================Declarations=========================
  testimonialListConfig: any = [];
  testimonialListConfig_skip: any = ["_id","description_html","description","created_at","inventory_image",'image'];
detail_skip_array:any=["_id"]
testimonialListConfig_modify_header: any = {"brand name":"Brand Name",
"parent category":"Parent Category","priority":"Priority","status":"Status"};
tableName: any = 'blog_category';
UpdateEndpoint: any = "addorupdatedata";
deleteEndpoint: any = "deletesingledata";
searchingEndpoint: any = "datalist";
editUrl: any = 'testimonial/edit';
apiUrl: any = this.ApiService.serverUrlDemo;
status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
view:any="blog_category";

// ====================================================================



  constructor(public router: Router, public activatedRoute: ActivatedRoute, private cookieService: CookieService, public ApiService: ApiService) { 

  // this.activatedRoute.data.subscribe(resolveData => {
  //   // this.testimonialListConfig.datasource = resolveData.testimonialList.res;
  //   // this.testimonialListConfig.jwtToken = this.cookieService.get('jwtToken');
    
  // });

  this.activatedRoute.data.forEach((res)=>{
    this.testimonialListConfig=res.testimonialList.res;
    // console.log('>>>>',this.testimonialListConfig)
  })


}

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../../../../api.service';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-listing-testimonial',
  templateUrl: './listing-testimonial.component.html',
  styleUrls: ['./listing-testimonial.component.css']
})
export class ListingTestimonialComponent implements OnInit {

  image_detail_datatype: any;
  user_cookie: any;
  public user_details:any;



  // ===============================Declarations=========================
  // testimonialListConfig: any = [];
  // testimonialListConfig_skip: any = ["_id", "description_html", "description", "created_at", "inventory_image", 'image'];
  // detail_skip_array: any = ["_id"]
  // testimonialListConfig_modify_header: any = {
  //   "brand name": "Brand Name",
  //   "parent category": "Parent Category", "priority": "Priority", "status": "Status"
  // };
  // tableName: any = 'blog_category';
  // UpdateEndpoint: any = "addorupdatedata";
  // deleteEndpoint: any = "deletesingledata";
  // searchingEndpoint: any = "datalist";
  // editUrl: any = 'testimonial/edit';
  // apiUrl: any = this.ApiService.serverUrlDemo;
  // status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  // view: any = "blog_category";



  public testimonialListConfig:any = {
    apiBaseUrl: this.ApiService.serverUrlDemo,
    listEndPoint: "datalist",
    datasource: "",
    tableName: "testimonial",
    updateurl: "addorupdatedata",
    editUrl: "testimonial/edit",
    jwtToken: "",   
    deleteEndPoint: "deletesingledata",
    // addLink: "testimonial/add",
    view: "testimonial_view"
  }

  // ====================================================================



  constructor(public router: Router, public activatedRoute: ActivatedRoute, private cookieService: CookieService, public ApiService: ApiService, private readonly meta: MetaService) {


    this.meta.setTitle('ProBid Auto - Testimonial Listing');
    this.meta.setTag('og:title', 'ProBid Auto - Testimonial Listing');
    this.meta.setTag('twitter:title', 'ProBid Auto - Testimonial Listing');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', '../../assets/images/logomain.png');
    this.meta.setTag('twitter:image', '../../assets/images/logomain.png');


    if (this.cookieService.get('user_details') != undefined && this.cookieService.get('user_details') != null && this.cookieService.get('user_details') != '') {
      this.user_details = JSON.parse(this.cookieService.get('user_details'));

     // console.log(this.user_id);
      // console.log('type>>', this.user_details.type)

    }

  }

  ngOnInit() {

    /** calling the testi list **/
    this.onTestiDataPopulate();
    
  }

  /** populating the testimonial data **/
  onTestiDataPopulate(){
    this.activatedRoute.data.subscribe(resolveData => {
      this.testimonialListConfig.datasource = resolveData.testimonialList.res;
      this.testimonialListConfig.jwtToken = this.cookieService.get('jwtToken');      
    });
  }

}

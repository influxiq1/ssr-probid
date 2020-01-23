import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-listing-blogs',
  templateUrl: './listing-blogs.component.html',
  styleUrls: ['./listing-blogs.component.css']
})
export class ListingBlogsComponent implements OnInit {


  // ===============================Declarations=========================
  blogListConfig: any = [];
<<<<<<< HEAD
  blogListConfig_skip: any = ["_id", "description_html", "description", "created_at", "inventory_image", 'image', "credentials", "profile_picture", "tags", "metatitle", "metadesc","blogcat"];
  detail_skip_array: any = ["_id"]
  blogListConfig_modify_header: any = {
    "blogtitle": "Blog Title",
    "parent category": "Parent Category", "priority": "Priority", "status": "Status",'blogcategory':'Blog Category'
  };
  tableName: any = 'blogs';
  UpdateEndpoint: any = "addorupdatedata";
  deleteEndpoint: any = "deletesingledata";
  searchingEndpoint: any = "datalist";
  editUrl: any = 'blogs/edit';
  apiUrl: any = this.apiService.serverUrlDemo;
  status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  view: any = "blogs_view";
  public user_cookie: any;
  public image_detail_datatype: any;

  // ====================================================================

  constructor(private cookieService: CookieService, public apiService: ApiService, private activatedRoute: ActivatedRoute) {
    if (this.cookieService.get('user_details') != undefined && this.cookieService.get('user_details') != null && this.cookieService.get('user_details') != '') {
      this.user_cookie = JSON.parse(this.cookieService.get('user_details'));
    }
  }
=======
  blogListConfig_skip: any = ["_id","description_html","description","created_at","inventory_image",'image', "credentials", "profile_picture", "tags", "metatitle", "metadesc" ];
 detail_skip_array:any=["_id"]
 blogListConfig_modify_header: any = {"brand name":"Brand Name",
"parent category":"Parent Category","priority":"Priority","status":"Status"};
 tableName: any = 'blogs';
 UpdateEndpoint: any = "addorupdatedata";
 deleteEndpoint: any = "deletesingledata";
 searchingEndpoint: any = "datalist";
 editUrl: any = 'blogs/edit';
 apiUrl: any = this.apiService.serverUrlDemo;
 status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
 view:any="blogs_view";
 public user_cookie: any;
 public image_detail_datatype: any;
 
 // ====================================================================

constructor(private cookieService: CookieService,public apiService: ApiService, private activatedRoute: ActivatedRoute, private readonly meta: MetaService) {

  this.meta.setTitle('ProBid Auto - Blog Lists');
    this.meta.setTag('og:title', 'ProBid Auto - Blog Lists');
    this.meta.setTag('twitter:title', 'ProBid Auto - Blog Lists');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', '../../assets/images/logomain.png');
    this.meta.setTag('twitter:image', '../../assets/images/logomain.png');

      // let data: any = {
      //   source:"blogs_view",
      //   endpoint: "datalist"

      // }
      // this.apiService.getDatalist(data).subscribe((result: any)=>{
      //   //console.log("================",result.res);
      //   this.blogListConfig= result.res;
      //   console.log('>>',this.blogListConfig)
      // });
      if (this.cookieService.get('user_details') != undefined && this.cookieService.get('user_details') != null && this.cookieService.get('user_details') != '') {
        this.user_cookie = JSON.parse(this.cookieService.get('user_details'));
        // console.log(this.userCookies);
        }
     }
>>>>>>> c57d68faabe95b3f7cc838d7083858781601115d

  ngOnInit() {
  
    /** calling the blog data **/
    this.onBlogDataPopulate();

  }

  /** on populating blog management data **/
  onBlogDataPopulate() {
    this.activatedRoute.data.subscribe(resolveData => {
      this.blogListConfig = resolveData.blogsList.res;
    });
  }

}

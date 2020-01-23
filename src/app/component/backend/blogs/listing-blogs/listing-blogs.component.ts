import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listing-blogs',
  templateUrl: './listing-blogs.component.html',
  styleUrls: ['./listing-blogs.component.css']
})
export class ListingBlogsComponent implements OnInit {


  // ===============================Declarations=========================
  blogListConfig: any = [];
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

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-listing-blogcat',
  templateUrl: './listing-blogcat.component.html',
  styleUrls: ['./listing-blogcat.component.css']
})
export class ListingBlogcatComponent implements OnInit {



  // ===============================Declarations=========================

  public user_cookie: any;
  blogListConfig: any = [];
  blogListConfig_skip: any = ["_id", "description_html", "description", "created_at", "inventory_image", 'image'];
  detail_skip_array: any = ["_id"]
  blogListConfig_modify_header: any = {
    "blogtitle": "Blog Title",
    "parentcategoryname": "Parent Category Name", "priority": "Priority", "status": "Status"
  };
  tableName: any = 'blog_category';
  UpdateEndpoint: any = "addorupdatedata";
  deleteEndpoint: any = "deletesingledata";
  searchingEndpoint: any = "datalist";
  editUrl: any = 'blog-category/edit/';
  apiUrl: any = this.apiService.serverUrlDemo;
  status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  view: any = "blog_category_view";

  // ====================================================================


  constructor(private activatedRoute: ActivatedRoute, private cookieService: CookieService, public apiService: ApiService) {   
    if (this.cookieService.get('user_details') != undefined && this.cookieService.get('user_details') != null && this.cookieService.get('user_details') != '') {
      this.user_cookie = JSON.parse(this.cookieService.get('user_details'));
      // console.log(this.userCookies);
    }
  }

  ngOnInit() {
    /** populating the blog data on start up **/
    this.onBlogCategoryDataPopulate();   
  }

  /** blog category data populate **/
  onBlogCategoryDataPopulate(){
    let data: any = {
      source: "blog_category_view",
      endpoint: "datalist"
    }
    this.apiService.getDatalist(data).subscribe((result: any) => {
      this.blogListConfig = result.res;
    });
  }
}

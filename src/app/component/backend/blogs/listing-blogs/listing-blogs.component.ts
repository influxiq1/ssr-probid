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
  blogListConfig_skip: any = ["_id", "description_html", "description", "created_at", "inventory_image", 'image', "credentials", "profile_picture", "tags", "metatitle", "metadesc","blogcat"];
  detail_skip_array: any = ["_id"]
  blogListConfig_modify_header: any = {
    "blogtitle": "Blog Title",
    "parent category": "Parent Category", "priority": "Priority", "status": "Status",'blogcategory':'Blog Category'
  };
  public jwtToken:any = "";
  tableName: any = 'blogs';
  UpdateEndpoint: any = "addorupdatedata";
  deleteEndpoint: any = "deletesingledata";
  searchingEndpoint: any = "datalist";
  editUrl: any = 'blogs/edit';
  apiUrl: any = this.apiService.serverUrlDemo;
  status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  view: any = "blogs_view";
  search_settings:any= {
    textsearch: [{ label: "blog title...", field: 'blogtitle_search' },{ label: "author...", field: 'author_search' }],
    selectsearch: [{ label: 'status...', field: 'status', values: [{ val: 1, name: "Active" }, { val: 0, name: 'Inactive' }] }],
  };
  public image_detail_datatype: any;

  // ====================================================================

  constructor(private cookieService: CookieService, public apiService: ApiService, private activatedRoute: ActivatedRoute, private readonly meta: MetaService) {
    this.meta.setTitle('ProBid Auto - Blog Lists');
    this.meta.setTag('og:title', 'ProBid Auto - Blog Lists');
    this.meta.setTag('twitter:title', 'ProBid Auto - Blog Lists');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', '../../assets/images/logomain.png');
    this.meta.setTag('twitter:image', '../../assets/images/logomain.png');

    if (this.cookieService.get('user_details') != undefined && this.cookieService.get('user_details') != null && this.cookieService.get('user_details') != '') {
      this.jwtToken = JSON.parse(this.cookieService.get('user_details'));
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
      this.jwtToken = this.cookieService.get('jwtToken');
    });
  }

}

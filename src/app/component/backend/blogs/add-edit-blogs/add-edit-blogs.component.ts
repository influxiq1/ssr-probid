import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../../../api.service';
import { MetaService } from '@ngx-meta/core';
@Component({
  selector: 'app-add-edit-blogs',
  templateUrl: './add-edit-blogs.component.html',
  styleUrls: ['./add-edit-blogs.component.css']
})
export class AddEditBlogsComponent implements OnInit {

  // public user_details: any;

  server: any =this.apiService.serverUrlDemo;
  addUrl: any = 'addorupdatedata';
  getDataUrl: any= 'datalist';
  public editdata: any = [];
  action:any="add";
  listURL:any="blog-management";



  public configData: any = {
    baseUrl: "https://fileupload.influxhostserver.com/",
    endpoint: "uploads",
    size: "51200", // kb
    format: ["jpg", "jpeg","png"], // use all small font
    type: "blogs-image",
    path: "blogs",
    prefix: "blogs-image_",
    formSubmit: false,
    conversionNeeded: 0,
    bucketName: "crmfiles.influxhostserver"
  }

  public configFileData: any = {
    baseUrl: "https://fileupload.influxhostserver.com/",
    endpoint: "uploads",
    size: "51200", // kb
    format: ["pdf", "doc", "docx","docxx"], // use all small font
    type: "blogs-file",
    path: "blogs",
    prefix: "blogs-file",
    formSubmit: false,
    conversionNeeded: 0,
    bucketName: "crmfiles.influxhostserver"
  }

  
  constructor(private cookieService: CookieService, private activatedRoute: ActivatedRoute,public apiService: ApiService, private readonly meta: MetaService) {
    this.meta.setTitle('ProBid Auto - Add edit Blog');
    this.meta.setTag('og:title', 'ProBid Auto - Add edit Blog');
    this.meta.setTag('twitter:title', 'ProBid Auto - Add edit Blog');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', '../../assets/images/logomain.png');
    this.meta.setTag('twitter:image', '../../assets/images/logomain.png');

    // if (this.cookieService.get('user_details') != undefined && this.cookieService.get('user_details') != null && this.cookieService.get('user_details') != '') {
    //   this.user_details = JSON.parse(this.cookieService.get('user_details'));
    // }

   }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      if (params._id) {
        this.activatedRoute.data.subscribe(resolveData => {         
          this.editdata= resolveData.blogsList.res[0];  
          this.action="edit";    
        });
      }
    });
  }

}

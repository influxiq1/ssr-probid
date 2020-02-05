import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../../api.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { MetaService } from '@ngx-meta/core';
import { FacebookService, LoginResponse,UIParams, UIResponse } from 'ngx-facebook';

export interface DialogData {
  data: any;
  name: string;
}

@Component({
  selector: 'app-bloglist',
  templateUrl: './bloglist.component.html',
  styleUrls: ['./bloglist.component.css']
})
export class BloglistfrontendComponent implements OnInit {

  public name: string;
  public highLoadMore:boolean=false;

  //Blogs Lib List
  public blogListConfig: any = {
    apiBaseUrl: this.apiService.serverUrlDemo,
    listEndPoint: "datalist",
    datasource: "",
    tableName: "blogs",
    updateurl: "addorupdatedata",
    editUrl: "blog-management/edit",
    jwtToken: this.cookieService.get('jwtToken'),
    deleteEndPoint: "deletesingledata",
    addLink: "/blog-management/add",
    view: "blogs"
  }
  public blogList: any;

  public blogcategory: any;
  public blogcount: any;
  public blogcategorysearch: any;
  public blogcategorycount: any;
  public blogcat: any;
  public blogsubcategorycount: any;
  public count: any = 0;
  public indexval: any = 4;
  public bloglisting: any;
  public videourl: any = '';
  public keyword_search: string;
  public url: "https://www.youtube.com/embed/"
  public category_search: any;
  public allBlogs: any = [];
  public allBlogsCategories:any;
  public blogtitle:any = '';
  public title:any;

  // btn_hide:any=false;
  safeSrc: SafeResourceUrl;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private cookieService: CookieService, public apiService: ApiService, public dialog: MatDialog, private sanitizer: DomSanitizer, private readonly meta: MetaService,public facebook:FacebookService) {


    this.meta.setTitle('ProBid Auto - Blogs');
    this.meta.setTag('og:description', 'Learn about all the latest developments and new technologies being introduced in the Online Auto Trading Industry with the latest Blogs written by our expert Online Auto Trading Professionals and Reps.');
    this.meta.setTag('twitter:description', 'Learn about all the latest developments and new technologies being introduced in the Online Auto Trading Industry with the latest Blogs written by our expert Online Auto Trading Professionals and Reps.');

    this.meta.setTag('og:keyword', 'Online Auto Industry Blogs, Online Auto Industry News, Online Auto Industry Journals');
    this.meta.setTag('twitter:keyword', 'Online Auto Industry Blogs, Online Auto Industry News, Online Auto Industry Journals');

    this.meta.setTag('og:title', 'ProBid Auto - Blog');
    this.meta.setTag('twitter:title', 'ProBid Auto - Blog');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', 'https://dev.probidauto.com/assets/images/logomain.png');
    this.meta.setTag('twitter:image', 'https://dev.probidauto.com/assets/images/logomain.png');


    facebook.init({
      appId: '2540470256228526',
      version: 'v2.9'
    });

  }

  panelOpenState = false;


  
//***********blog list view in blog detail************//
  blogdetail(val:any){
    console.log(val)
    this.title=val.blogtitle
    this.blogtitle=this.title.split(' ').join('-')
    // console.log(this.blogtitle)
    if (this.blogtitle != '') {
      this.router.navigateByUrl('/blogs/'+ this.blogtitle+'/' +val._id);
    }
  }


  ngOnInit() {

    /** getting all blog category **/
    this.getBlogCategories();

    //**all blog category and blog list from resolve in routing**//

    this.activatedRoute.data.forEach((data: any) => {
      this.blogList = data;
      //  console.log('>>>>>>>>>>>>>>',this.blogList)

    })

    //****total blog list****//
    this.bloglisting = this.blogList.blogCatList.blogs
    // console.log('---------------',this.bloglisting)



    /**api service for total blog_catagory by uttam */

    this.blogcategory = this.blogList.blogCatList.blog_category;


    /**api service for blog_catagory total count by uttam */


    this.blogcategorycount = this.blogList.blogCatList.blog_category.length;
  }

  /** end api service for blog_catagory total count by uttam */


  fbShare(val:any){
    console.log(val)
    this.title=val.blogtitle
    this.blogtitle=this.title.split(' ').join('-')
    var url='http://192.168.1.187:4200/blogs'+ this.blogtitle+ '/'+val._id;

    let params: UIParams = {
      href: url,
      method: 'share'
    };
    this.facebook.ui(params).then((res:UIResponse)=>{
    }).catch(fb=>{
      console.log(fb)
    });

  }



  /** search by keyword **/
  searchByKey(val: any) {
    let data: any = {
      "condition":
      {
        "blogtitle_search_regex": val.toLowerCase(),
        // "author_regex":val

      },
      "source": "blogs_view",
      "endpoint": "datalistwithouttoken"
    }

    this.apiService.getDatalist(data).subscribe((result: any) => {
      this.bloglisting = result.res;
    });
  }

  /** serach by category **/
  searchByCategory(val: any) {
    // console.log(val.toLowerCase());
    let data: any = {
      "condition":
      {
        "blogcategory_regex": val.toUpperCase(),
        // "author_regex":val

      },
      "source": "blogs_view",
      "endpoint": "datalistwithouttoken"
    }

    this.apiService.getDatalist(data).subscribe((result: any) => {
      this.bloglisting = result.res;
    });
  }


  getAllBlogs(val:any) {
    // console.log("clicked",val);
    let data: any = {
      "source": "blogs_view",
      "endpoint": "datalistwithouttoken",
      "condition":{
        "blogcat_object":val
      }
    }

    this.apiService.getDatalist(data).subscribe((result: any) => {
      this.allBlogs = result.res;
      this.bloglisting = result.res;
      // console.log("yy",this.allBlogs);
    });
  }

  getBlogCategories(){
    let data: any = {
      "source": "blog_category_view",
      "endpoint": "datalistwithouttoken",
      "condition":{
      }
    }

    this.apiService.getDatalist(data).subscribe((result: any) => {
      this.allBlogsCategories = result.res;
      // console.log("ssssssss",this.allBlogsCategories);
    });
  }
  

//*********** sub blog list view in blog detail************//
    blog(val:any){
      // console.log(val)
      this.blogcat = val._id;
      this.router.navigateByUrl('/blogdetail/'+val._id)
    }

  openvideourl(val: any) {

    let url: any;
    url = "https://www.youtube.com/embed/";
    // console.log('video url....>',url+val);
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url + val);

    // console.log('>>>>>>>>>>>>>>>>>>',this.safeSrc)
    const dialogRef = this.dialog.open(CommonVideoModalComponent, {
      panelClass: ['modal-md', 'commonVideoDialogCls'],
      // width:'450px',
      data: this.safeSrc,
      height: 'auto',
      width: '100%',
      maxWidth: '90vw',
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  //********* end Video modal section***********//


  //*********** Coming Soon ************//
  comingSoonDialogBlog(): void {
    const dialogRef = this.dialog.open(comingSoonDialogBlog, {

      data: { name: this.name }
    });

    setTimeout(() => {
      this.dialog.closeAll();
    }, 4000);
  }
  //*********** Coming Soon ************//


  //*********** sub blog list view in blog detail************//
  // blog(val: any) {
  //   this.blogcat = val._id;
  //   this.router.navigateByUrl('/blogdetail/' + val._id)
  // }

  //*********** end sub blog list view in blog detail************//



  //***********load more view blog *************//
  blogloadmore() {
    let data: any = {
      endpoint: 'loadmoreblogdata',
      "condition": {
        "limit": 10,
        "skip": this.indexval
    }
    }
    this.apiService.getDatalist(data).subscribe((res:any)=>{
      if(res.blogs.length > 0){
        this.bloglisting = res.blogs.concat(this.bloglisting);
        this.indexval = this.indexval + 10;
      }else{
        this.highLoadMore=true;
      }
      
    })
    

  }

  //**blog view from blog category list**//
  openblog(val: any) {
    // console.log(val)
  }
}

//**********video modal component************//
@Component({
  selector: 'app-commonvideomodal',
  templateUrl: './commonvideomodal.html'
})
export class CommonVideoModalComponent {
  constructor(public dialogRef: MatDialogRef<CommonVideoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }
}

@Component({
  selector: 'app-coming-soon',
  templateUrl: '../../../layout/coming-soon.html'
})
export class comingSoonDialogBlog {

  constructor(
    public dialogRef: MatDialogRef<comingSoonDialogBlog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
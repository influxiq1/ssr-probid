import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../../api.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { MetaService } from '@ngx-meta/core';
import { FacebookService, LoginResponse, UIParams, UIResponse } from 'ngx-facebook';


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
  public profile: any;

  public blogcategory: any;
  public blogcount: any;
  public blogcategorysearch: any;
  public blogcategorycount: any;
  public blogcat: any='';
  public blogsubcategorycount: any;
  public count: any = 0;
  public indexval: any = 4;
  public bloglisting: any;
  public videourl: any = '';
  public keyword_search: string;
  public url: "https://www.youtube.com/embed/"
  public category_search: any;
  public catBlogs: any;
  public allBlogsCategories:any;
  public blogtitle:any = '';
  public title:any;
  public blogCat:any;
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


  ngOnInit() {

    /** getting all blog category **/

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
    // console.log( this.blogcategory)


    /**api service for blog_catagory total count by uttam */


    this.blogcategorycount = this.blogList.blogCatList.blog_category.length;
  }



    
//***********blog list view in blog detail************//
blogdetail(val:any){
  console.log(val)
  this.title=val.blogtitle;
    this.blogtitle=this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
  // console.log(this.blogtitle)
  if (this.blogtitle != '') {
    this.router.navigateByUrl('/blogs/'+ this.blogtitle+'/' +val._id);
  }
}


  /** end api service for blog_catagory total count by uttam */



    //FACEBOOK SHARE

    login() {
      this.facebook.login()
        .then((res: LoginResponse) => {
         
          this.getProfile();
        })
        .catch();
    }
    getProfile() {
      this.facebook.api('me/?fields=id,name,email,picture')
        .then((res: any) => {
         
          this.profile = res;
          
        })
        .catch((error: any) => {
  
        });
    }

    fbShare(val:any){
      // console.log(val)
      this.title=val.blogtitle;
      this.blogtitle=this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
      // console.log(this.blogtitle)

      var url='https://dev.probidauto.com/blogs/'+this.blogtitle+'/'+ val._id;
      console.log(url)
  
      let params: UIParams = {
        href: url,
        method: 'share'
      };
      this.facebook.ui(params).then((res:UIResponse)=>{
      }).catch(facebook=>{
        console.log(facebook)
      });
  
    }

    logoutWithFacebook(): void {
  
      this.facebook.logout().then();
    }


  //twitter share

  twitterShare(val:any){
  
    // console.log(val)
    this.title=val.blogtitle;
    this.blogtitle=this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
    // console.log(this.blogtitle)

    window.open('https://twitter.com/intent/tweet?url=dev.probidauto.com/blogs/'+this.blogtitle+'/'+ val._id);
    // console.log(url)

  }

  // linkedin share 
  
  linkedinShare(val:any){
  
    console.log(val)
    this.title=val.blogtitle;
    this.blogtitle=this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
    // console.log(this.blogtitle)

    window.open('https://www.linkedin.com/sharing/share-offsite/?url=dev.probidauto.com/blogs/'+this.blogtitle+'/'+ val._id);
    // console.log(url)

  }


  // tumblr share 
  
  tumblrShare(val:any){
  
    console.log(val)
    this.title=val.blogtitle;
    this.blogtitle=this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');
    // console.log(this.blogtitle)

    window.open('http://www.tumblr.com/share?url=dev.probidauto.com/blogs/'+this.blogtitle+'/'+ val._id);
    // console.log(url)

  }

  //search by category

  blogCatSearch(val:any){
    console.log(val)
    let data: any = {
      "endpoint": "getbloglistbycategoryid",
      "blogcat":val
      
    }

    this.apiService.getDatalist(data).subscribe((result: any) => {

      this.bloglisting = result.results.blogs;

  })
}


  reset(){

    this.blogCat='';
    this.bloglisting = this.blogList.blogCatList.blogs

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



  getAllBlogs(val:any) {
    console.log("clicked",val);
    let data: any = {
      "endpoint": "getbloglistbycategoryid",
      "blogcat":val
      
    }

    this.apiService.getDatalist(data).subscribe((result: any) => {

      this.catBlogs = result.results.blogs;
      console.log("yy",this.catBlogs);

      // this.bloglisting = result.res;
      // console.log("yy",this.allBlogs);
    });
  }



//*********** sub blog list view in blog detail************//
    blog(val:any){
      console.log(val)
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
    let data: any = {};
    if(this.blogCat==''){
    data={
      endpoint: 'loadmoreblogdata',
      "condition": {
        "limit": 10,
        "skip": this.indexval
    }
  }
    }else{

      data={
        endpoint: 'loadmoreblogdata',
        "condition": {
          "limit": 10,
          "skip": this.indexval,
          "catid":this.blogCat
      }
    }

    }
    this.apiService.getDatalist(data).subscribe((res:any)=>{
      if(res.blogs.length > 0){
        this.bloglisting = this.bloglisting.concat(res.blogs);
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
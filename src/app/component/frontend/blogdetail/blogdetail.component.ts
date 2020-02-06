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

}

@Component({
  selector: 'app-blogdetail',
  templateUrl: './blogdetail.component.html',
  styleUrls: ['./blogdetail.component.css']
})
export class BlogdetailComponent implements OnInit {
  public blogcategorysearch: any;
  public blogcategory: any;
  public blogcategorycount: any;
  public blog: any = '';
  public blogcat: any;
  public blogsubcat: any;
  public blogList: any;
  public blog_img: any
  public blog_image: any;
  public panelOpenState = false;
  public videourl: any = '';
  public profile: any;
  public url: "https://www.youtube.com/embed/"
  // btn_hide:any=false;
  safeSrc: SafeResourceUrl;

  public name: string;
  public blogtitle:any;
  public title:any;

  /************** lib list setup start here *************/
  public blogListConfig: any = {
    apiBaseUrl: this.apiService.serverUrlDemo,
    listEndPoint: "datalist",
    datasource: "",
    tableName: "blog_category",
    updateurl: "addorupdatedata",
    editUrl: "blog-category/edit",
    jwtToken: "",
    deleteEndPoint: "deletesingledata",
    addLink: "/blog-category/add",
    view: "blog_category_view"

  }
  constructor(public apiService: ApiService, public router: Router, private activatedRoute: ActivatedRoute, private cookieService: CookieService, private sanitizer: DomSanitizer, public dialog: MatDialog, private readonly meta: MetaService,public facebook:FacebookService) {

    // console.log(this.activatedRoute.snapshot.params.blogtitle)



    facebook.init({
      appId: '2540470256228526',
      version: 'v2.9'
    });

  }

  ngOnInit() {
    

    this.activatedRoute.data.forEach((data: any) => {
      this.blog = data.blogCatList.res[0];
      console.log('+++++++++++++++++>>>>>>>>>>>>>>', this.blog)
      //  this.blog_img=this.blog[0].blogs_image[0].basepath+this.blog[0].blogs_image[0].image; 
      //  this.blog_img=this.blog[0].profile_picture;
      //  console.log(this.blog_img)


      this.title=this.blog.blogtitle;
      this.blogtitle=this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');


      this.meta.setTag('og:type', 'website');

      this.meta.setTag('og:keyword', 'Online Auto Industry Blogs, Online Auto Industry News, Online Auto Industry Journals');
      this.meta.setTag('twitter:keyword', 'Online Auto Industry Blogs, Online Auto Industry News, Online Auto Industry Journals');

      if (this.blog != null && this.blog.length != 0) {
        this.meta.setTitle('ProBid Auto-'+''+this.blogtitle);
        this.meta.setTag('og:description', this.blog.description_html);
        this.meta.setTag('twitter:description', this.blog.description_html);
        this.meta.setTag('og:title', this.blogtitle);
        this.meta.setTag('twitter:title', this.blogtitle);
        this.meta.setTag('og:image', this.blog.profile_picture);
        this.meta.setTag('og:image:width', 'auto');
        this.meta.setTag('og:image:height', 'auto');
        this.meta.setTag('twitter:image', this.blog.profile_picture);
        this.meta.setTag('og:url', 'https://dev.probidauto.com/blogs/'+this.activatedRoute.snapshot.params.blogtitle+'/'+this.blog._id);

      }
    })


    /**api service for blog_catagory count by uttam */
    var datacatcount: any = {};
    datacatcount = {
      source: "blog_category"
    }

    this.apiService.getDatalistWithToken(datacatcount, "datalistwithouttoken").subscribe((res: any) => {

      this.blogcategorycount = res.resc;
      //  console.log(this.blogcategorycount);
      this.blogcategory = res.res;

    });





    /**api service for sub blog_catagory by uttam */
    var datacatsearch: any = {};
    datacatsearch = {
      source: "blogs_view"

    }
    this.apiService.getDatalistWithToken(datacatsearch, "datalistwithouttoken").subscribe((res: any) => {

      this.blogcategorysearch = res.res;
      //  console.log(this.blogcategorysearch)

    });
  }

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
  fbShare(){
    var url='https://dev.probidauto.com/blogs/'+this.blogtitle+'/'+this.blog._id;
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



  subblog(val: any) {

  }

  openvideourl(val: any) {
    //console.log(val)
    let url: any;
    url = "https://www.youtube.com/embed/";
    //console.log('video url....>',url+val);
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url + val);

    //console.log('>>>>>>>>>>>>>>>>>>',this.safeSrc)
    const dialogRef = this.dialog.open(VideoModalComponent, {
      // panelClass:['modal-md','success-modal'],

      // width:'450px',
      // data:this.safeSrc,

      panelClass: ['modal-md', 'commonVideoDialogCls'],
      data: this.safeSrc,
      height: 'auto',
      width: '100%',
      maxWidth: '90vw',



    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }


  //*********** Coming Soon ************//
  comingSoonDialogBlog(): void {
    const dialogRef = this.dialog.open(comingSoonDialogBlogDetail, {

      data: { name: this.name }
    });

    setTimeout(() => {
      this.dialog.closeAll();
    }, 4000);
  }
  //*********** Coming Soon ************//


}


@Component({
  selector: 'app-videomodal',
  templateUrl: './videomodal.html'
})
export class VideoModalComponent {
  constructor(public dialogRef: MatDialogRef<VideoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }
}


@Component({
  selector: 'app-coming-soon',
  templateUrl: '../../../layout/coming-soon.html'
})
export class comingSoonDialogBlogDetail {

  constructor(
    public dialogRef: MatDialogRef<comingSoonDialogBlogDetail>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../../api.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { MetaService } from '@ngx-meta/core';
import { FacebookService, LoginResponse, UIParams, UIResponse } from 'ngx-facebook';
// import { runInThisContext } from 'vm';

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
  public catBlogs:any;

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


    this.meta.setTag('og:type', 'website');

      this.meta.setTag('og:keyword', 'Online Auto Industry Blogs, Online Auto Industry News, Online Auto Industry Journals');
      this.meta.setTag('twitter:keyword', 'Online Auto Industry Blogs, Online Auto Industry News, Online Auto Industry Journals');
      this.meta.setTitle('ProBid Auto-'+''+this.activatedRoute.snapshot.params.blogtitle);
      // console.log('ProBid Auto-'+''+this.activatedRoute.snapshot.params.blogtitle)

  }

  ngOnInit() {
    

    // let data:any;
    // data={
      
    //   "blog_id":this.activatedRoute.snapshot.params._id
    // }

    // this.apiService.CustomRequest(data,'blogdetailsda    tabyid').subscribe((data: any) => {
    // }
    this.activatedRoute.data.forEach((res)=>{

      this.blog = res.blogCatList.blogs[0];
      console.log('+++++++++++++++++>>>>>>>>>>>>>>', this.blog);

     
      this.blogcategory=res.blogCatList.blog_category
      console.log(this.blogcategory)
      this.title=this.blog.blogtitle;
      this.blogtitle=this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-');


      

      if (this.blog != '') {
        this.meta.setTitle('ProBid Auto-'+''+this.blogtitle);
        this.meta.setTag('og:description', this.blog.description_html);
        this.meta.setTag('twitter:description', this.blog.description_html);
        this.meta.setTag("description", this.blog.description_html)

        this.meta.setTag('og:title', this.blogtitle);
        this.meta.setTag('twitter:title', this.blogtitle);
        this.meta.setTag('og:image', this.blog.blogs_image);
        this.meta.setTag('og:image:width', 'auto');
        this.meta.setTag('og:image:height', 'auto');
        this.meta.setTag('twitter:image', this.blog.blogs_image);
        this.meta.setTag('og:url', 'https://dev.probidauto.com/blogs/'+this.activatedRoute.snapshot.params.blogtitle+'/'+this.blog._id);


        // console.log('og:description', this.blog.description_html)

        // console.log('og:image', this.blog.blogs_image)

        // console.log(this.activatedRoute.snapshot.params.blogtitle+'/'+this.blog._id)



      }
    })


  }

//blog category

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
      method: 'share',
      quote: 'https://dev.probidauto.com/'
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

   twitterShare(){

    window.open('https://twitter.com/intent/tweet?url=dev.probidauto.com/blogs/'+this.blogtitle+'/'+ this.blog._id);
    // console.log(url)

  }

  // linkedin share 
  
  linkedinShare(){

    window.open('https://www.linkedin.com/sharing/share-offsite/?url=dev.probidauto.com/blogs/'+this.blogtitle+'/'+this.blog._id);
    // console.log(url)

  }


  // tumblr share 
  
  tumblrShare(){

    window.open('http://www.tumblr.com/share?url=dev.probidauto.com/blogs/'+this.blogtitle+'/'+ this.blog._id);
    // console.log(url)

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
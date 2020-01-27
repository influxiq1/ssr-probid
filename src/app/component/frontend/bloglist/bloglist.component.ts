import { Component, OnInit,Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../../api.service';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from "@angular/material";
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { MetaService } from '@ngx-meta/core';

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
  
  public  name: string;

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
  public blogcategory:any;
  public blogcount:any;
  public blogcategorysearch:any;
  public blogcategorycount:any;
  public blogcat:any;
  public blogsubcategorycount:any;
  public count:any=0;
  public indexval:any=4;
  public bloglisting:any;
  public videourl:any='';
  public url:"https://www.youtube.com/embed/"
  // btn_hide:any=false;
  safeSrc: SafeResourceUrl;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private cookieService: CookieService, public apiService: ApiService,public dialog:MatDialog, private sanitizer: DomSanitizer,private readonly meta: MetaService) {

    
    this.meta.setTitle('ProBid Auto - Blog lists');
    this.meta.setTag('og:description', 'Learn about all the latest developments and new technologies being introduced in the Online Auto Trading Industry with the latest Blogs written by our expert Online Auto Trading Professionals and Reps.');
    this.meta.setTag('twitter:description', 'Learn about all the latest developments and new technologies being introduced in the Online Auto Trading Industry with the latest Blogs written by our expert Online Auto Trading Professionals and Reps.');
        
    this.meta.setTag('og:keyword', 'Online Auto Industry Blogs, Online Auto Industry News, Online Auto Industry Journals');
    this.meta.setTag('twitter:keyword', 'Online Auto Industry Blogs, Online Auto Industry News, Online Auto Industry Journals');

    this.meta.setTag('og:title', 'ProBid Auto - Blog lists');
    this.meta.setTag('twitter:title', 'ProBid Auto - Blog lists');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', 'https://dev.probidauto.com/assets/images/logomain.png');
    this.meta.setTag('twitter:image', 'https://dev.probidauto.com/assets/images/logomain.png');

  }

  panelOpenState = false;


  
//***********blog list view in blog detail************//
  blogdetail(val:any){
    // console.log(val)
    this.router.navigateByUrl('/blogdetail/' +val)
  }
  

  ngOnInit() {

    //**all blog category and blog list from resolve in routing**//

    this.activatedRoute.data.forEach((data: any) => {
      this.blogList = data;
      //  console.log('>>>>>>>>>>>>>>',this.blogList)

    })
    
   //****total blog list****//
          this.bloglisting = this.blogList.blogCatList.blogs
          // console.log('---------------',this.bloglisting)
          


    /**api service for total blog_catagory by uttam */
   
          this.blogcategory =this.blogList.blogCatList.blog_category;


    /**api service for blog_catagory total count by uttam */
   

          this.blogcategorycount = this.blogList.blogCatList.blog_category.length;
    }

  /** end api service for blog_catagory total count by uttam */


    //*********view Video modal section***********//

    openvideourl(val:any){

     let url:any;
     url="https://www.youtube.com/embed/";
      // console.log('video url....>',url+val);
      this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(url + val);
      
      // console.log('>>>>>>>>>>>>>>>>>>',this.safeSrc)
      const dialogRef = this.dialog.open(CommonVideoModalComponent, {
        panelClass:['modal-md','commonVideoDialogCls'],
        // width:'450px',
        data:this.safeSrc,
        height: 'auto',
        width: '100%',
        maxWidth:'90vw',     
      });
      dialogRef.afterClosed().subscribe(result => {  
      });
    }

//********* end Video modal section***********//


//*********** Coming Soon ************//
comingSoonDialogBlog(): void {
  const dialogRef = this.dialog.open(comingSoonDialogBlog, {
   
    data: {name: this.name}
  });

  setTimeout(() => {
    this.dialog.closeAll();
  }, 4000);
}
//*********** Coming Soon ************//


//*********** sub blog list view in blog detail************//
    blog(val:any){
      this.blogcat = val._id;
      this.router.navigateByUrl('/blogdetail/'+val._id)
    }

//*********** end sub blog list view in blog detail************//



//***********load more view blog *************//
    blogloadmore(){
      //console.log('load more')
      // let data: any = {
      //   "condition": {
      //     "limit": 8,
      //     "skip": 1
      // }
      // }
      // this.apiService.getdata(data, 'blogdata').subscribe((res:any)=>{
      //   console.log(res);
      //   this.bloglisting = res.blogs;
      // })
      this.indexval=this.indexval+2;
 
    }

    //**blog view from blog category list**//
    openblog(val:any){
      // console.log(val)
    }
}

//**********video modal component************//
@Component({
  selector:'app-commonvideomodal',
  templateUrl:'./commonvideomodal.html'
})
export class CommonVideoModalComponent {
  constructor( public dialogRef: MatDialogRef<CommonVideoModalComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData){

  }
}

@Component({
  selector:'app-coming-soon',
  templateUrl: '../../../layout/coming-soon.html'
})
export class comingSoonDialogBlog {

  constructor(
    public dialogRef: MatDialogRef<comingSoonDialogBlog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ApiService} from '../../../api.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public saveCarDataList:any;



  carouselOptions = {
    margin: 5,
    nav: true,
    loop: true,
    navText: ["<div class='nav-btn prev-slide'><i class='material-icons'>keyboard_backspace</i></div>", "<div class='nav-btn next-slide'><i class='material-icons'>keyboard_backspace</i></div>"],
    responsiveClass: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
        autoplay: true,
        autoplayTimeout: 6000,
        autoplayHoverPause: true,
        center: true,
        loop: true,
        nav: true,
      },
      600: {
        items: 1,
        autoplay: true,
        autoplayTimeout: 6000,
        autoplayHoverPause: true,
        center: true,
        loop: true,
        nav: true,
      },
      991: {
        items: 1,
        autoplay: true,
        autoplayTimeout: 6000,
        autoplayHoverPause: true,
        center: true,
        loop: true,
        nav: true,         
      },
      992: {
        items: 3,
        autoplay: true,
        autoplayTimeout: 6000,
        autoplayHoverPause: true,
        center: true,
        loop: true,
        nav: true,
        dot:false,
      }
    }
  }

  public TestimonialListArray: any = [];
  public savedUrl: any = [];
  public savedId: any = [];
  public blogList: any;
  public indexval:any = 3;


  constructor(private cdr: ChangeDetectorRef, private readonly meta: MetaService, private router: Router, public activatedRoute: ActivatedRoute,public apiService:ApiService) { 
    this.meta.setTitle('ProBid Auto - Car-Buying Made Easy!');
    this.meta.setTag('og:description', 'ProBid Auto offers the easiest and the most convenient way for car buyers to get their desired cars, listing Used Cars for Sale from multiple dealerships and major Auction houses around the USA.');
    this.meta.setTag('twitter:description', 'ProBid Auto offers the easiest and the most convenient way for car buyers to get their desired cars, listing Used Cars for Sale from multiple dealerships and major Auction houses around the USA.');
    this.meta.setTag('og:keyword', 'ProBid Auto, Used Cars for Sale in USA, Buy Used Cars USA, Used Car Dealership the USA');
    this.meta.setTag('twitter:keyword', 'ProBid Auto, Used Cars for Sale in USA, Buy Used Cars USA, Used Car Dealership the USA');
    this.meta.setTag('og:title', 'ProBid Auto - Car-Buying Made Easy!');
    this.meta.setTag('twitter:title', 'ProBid Auto - Car-Buying Made Easy!');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', '../../assets/images/logomain.png');
    this.meta.setTag('twitter:image', '../../assets/images/logomain.png');
  }

  ngOnInit() {
    this.activatedRoute.data.forEach((data: any) =>{
      this.blogList = data.home_data.result.blog_list;
      this.TestimonialListArray = data.home_data.result.testmonial_list;
      //  console.log('+++++++++++++++++>>>>>>>>>>>>>>',data.home_data.result.blog_list)
      //  this.blog_img=this.blog[0].blogs_image[0].basepath+this.blog[0].blogs_image[0].image;
      //  this.TestimonialListArray=this.blog[0].profile_picture;
      //  console.log(this.blog_img)
      })
  


      //for preown car
    // this.getData;

    let data: any = {
      source:'save_favorite_view', 
      
    
    }
    this.apiService.getDatalistWithToken(data,'datalistwithouttoken').subscribe((resc:any)=>{
      // console.log('>>>>',resc.res);
      this.saveCarDataList=resc.res
    })
     

   }
   
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }


  showBut() {
    // console.log('show button')
  }

  btnClick() {
    this.router.navigateByUrl('/testimonial');
  };


  blogdetail(val:any){
    // console.log(val)
    this.router.navigateByUrl('/blogdetail/' +val)
  }
  
  showMoreFunc(){
    this.indexval = this.indexval + 3;   
    // console.log(this.indexval);
  }

  // getData(){
  //   let data: any = {
  //     endpoint: 'datalist',
  //     source: 'save_favorite_view',
      
  //   }
  //   this.apiService.getDatalist(data).subscribe((res:any)=>{
  //     console.log(res);
  //   })
  // }



}

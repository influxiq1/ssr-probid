import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment'; // add this 1 of 4
import { ApiService } from '../../../api.service';
import { MetaService } from '@ngx-meta/core';
import { FacebookService, LoginResponse, UIParams, UIResponse } from 'ngx-facebook';

import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from "@angular/material";
// import { runInThisContext } from 'vm';
export interface DialogData {
  data: any;
  name: string;
} 
@Component({
  selector: 'app-tesimoniallist',
  templateUrl: './tesimoniallist.component.html',
  styleUrls: ['./tesimoniallist.component.css']
})
export class TesimoniallistComponent implements OnInit {
  // private indexvallength: any;
  public TestimonialListArray: any = [];
  // showMore = false;
  showme = true;
  public indexval: any = 6;
  public dataformate: any;
  public p_id: any;
  // public indexvallength:any ='';

  public  name: string;
  public profile: any;


  constructor(private activatedRoute: ActivatedRoute, private router: Router,public apiService: ApiService, private readonly meta: MetaService,public dialog:MatDialog ,public facebook:FacebookService) {
    this.dataformate = moment(); // add this 2 of 4
    //console.log(this.dataformate)

    
    facebook.init({
      appId: '2540470256228526',
      version: 'v2.9'
    });
    
    

   }


  ngOnInit() 
  {

    if(this.router.url == '/testimonial'){

      this.activatedRoute.data.forEach(data => {
        let result: any = {};
        result = data.testimonialListData.res;
        this.TestimonialListArray = result;
        // console.warn(this.TestimonialListArray);
        // this.indexvallength = this.TestimonialListArray.length;
      })
  

    }

    else {
      // console.log('hlo')
      
      this.activatedRoute.data.forEach(data => {
        let result: any = {};
        result = data.testimonialListData.testimonial_list;
        this.TestimonialListArray = result;
        // console.warn(this.TestimonialListArray);
        // this.indexvallength = this.TestimonialListArray.length;

      })

      for(let item in  this.TestimonialListArray){
        // console.log('in for in ',this.TestimonialListArray[item]._id,this.activatedRoute.snapshot.params.id);
        if(this.activatedRoute.snapshot.params.id == this.TestimonialListArray[item]._id){
          // console.log('item',item)
        }
      }


    }




    if(this.activatedRoute.snapshot.params.id == null){
      this.meta.setTitle('ProBid Auto - Testimonials');
    this.meta.setTag('og:description', 'ProBid Testimonials, BroBid Auto Customer Reviews, ProBid Auto User Reviews');
    this.meta.setTag('twitter:description', 'Check out what our Customers and Sales Reps have to say about ProBid Auto. Customer reviews that will help you to understand the convenient ways in which we get you the Pre-Owned Vehicles you desire');    
    this.meta.setTag('og:keyword', 'ProBid Testimonials, BroBid Auto Customer Reviews, ProBid Auto User Reviews');
    this.meta.setTag('twitter:keyword', 'ProBid Testimonials, BroBid Auto Customer Reviews, ProBid Auto User Reviews');
    this.meta.setTag('og:title', 'ProBid Auto - Testimonials');
    this.meta.setTag('twitter:title', 'ProBid Auto - Testimonials');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', 'https://dev.probidauto.com/assets/images/logomain.png');
    this.meta.setTag('twitter:image', 'https://dev.probidauto.com/assets/images/logomain.png');

    }

    if(this.activatedRoute.snapshot.params.id != null) {

      for(let item in  this.TestimonialListArray){
        if(this.activatedRoute.snapshot.params.id == this.TestimonialListArray[item]._id){
          // console.log('item',item,this.TestimonialListArray[item]);
          this.meta.setTag('og:title', 'ProBid Auto - Testimonials '+this.TestimonialListArray[item].name);
          this.meta.setTag('twitter:title', 'ProBid Auto - Testimonials'+this.TestimonialListArray[item].name);
          this.meta.setTag('og:image', this.TestimonialListArray[item].testimonial_img);
          this.meta.setTag('twitter:image', this.TestimonialListArray[item].testimonial_img);
          this.meta.setTag('og:description', this.TestimonialListArray[item].description_html);
          this.meta.setTag('twitter:description', this.TestimonialListArray[item].description_html);  
          this.meta.setTag('og:url', 'https://dev.probidauto.com/testimonial/'+  this.TestimonialListArray[item]._id);

        }
      }


      //this.meta.setTitle('ProBid Auto - Testimonials');
        
      this.meta.setTag('og:keyword', 'ProBid Testimonials, BroBid Auto Customer Reviews, ProBid Auto User Reviews');
      this.meta.setTag('twitter:keyword', 'ProBid Testimonials, BroBid Auto Customer Reviews, ProBid Auto User Reviews');
      this.meta.setTag('og:type', 'website');

      


    }



  }

  btnBackClick = function () {
    this.router.navigateByUrl('testimonial');
  };

  showMoreFunc() {
    this.indexval = this.indexval + 3;
    // console.log(this.indexval);
  }

  showmore(index:any) {
   this.p_id = index._id;
  }

  showaudio() {
    // console.log('showaudio function is wirking')
  }

  showvideo() {
    // console.log('showvideo function is wirking')
  }


  // fbShare(val:any){
  //   console.log(val)
  //   // this.router.navigateByUrl('/testimonial/' + val._id)
    
  // }

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
        // this.router.navigateByUrl('/testimonial/' + val._id)

        // console.log(val)
        var url='https://dev.probidauto.com/testimonial/'+ val._id;
        console.log(url)
    
        let params: UIParams = {
          href: url,
          method: 'share'
        };
        this.facebook.ui(params).then((res:UIResponse)=>{
        }).catch(facebook=>{
          // console.log(facebook)
        });
    
      }
  
      logoutWithFacebook(): void {
    
        this.facebook.logout().then();
      }


        //twitter share

  twitterShare(val:any){
  
    // console.log(val)

    window.open('https://twitter.com/intent/tweet?url=dev.probidauto.com/testimonial/'+ val._id);
    // console.log(url)

  }

  // linkedin share 
  
  linkedinShare(val:any){
  
    // console.log(val)

    window.open('https://www.linkedin.com/sharing/share-offsite/?url=dev.probidauto.com/testimonial/'+ val._id);
    // console.log(url)

  }


  // tumblr share 
  
  tumblrShare(val:any){
  
    // console.log(val)
    window.open('http://www.tumblr.com/share?url=dev.probidauto.com/testimonial/'+ val._id);
    // console.log(url)

  }





  
//*********** Coming Soon ************//
comingSoonDialogTestimonList(): void {
  const dialogRef = this.dialog.open(comingSoonDialogTestimonListhome, {
   
    data: {name: this.name}
  });

  setTimeout(() => {
    this.dialog.closeAll();
  }, 4000);
}





//*********** Coming Soon ************//

}


@Component({
  selector:'app-coming-soon',
  templateUrl: '../../../layout/coming-soon.html'
})
export class comingSoonDialogTestimonListhome {

  constructor(
    public dialogRef: MatDialogRef<comingSoonDialogTestimonListhome>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
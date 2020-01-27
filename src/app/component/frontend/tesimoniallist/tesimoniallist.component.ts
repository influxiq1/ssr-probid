import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment'; // add this 1 of 4
import { ApiService } from '../../../api.service';
import { MetaService } from '@ngx-meta/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from "@angular/material";
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
  private indexvallength: any;
  public TestimonialListArray: any = [];
  // showMore = false;
  showme = true;
  public indexval: any = 6;
  public dataformate: any;
  public p_id: any;

  public  name: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,public apiService: ApiService, private readonly meta: MetaService,public dialog:MatDialog) {
    this.dataformate = moment(); // add this 2 of 4
    //console.log(this.dataformate)
    
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


  ngOnInit() {
    
    this.activatedRoute.data.forEach(data => {
      let result: any = {};
      result = data.testimonialListData.res;
      this.TestimonialListArray = result;
      this.indexvallength = this.TestimonialListArray.length;
    })
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

  
//*********** Coming Soon ************//
comingSoonDialogTestimonhome(): void {
  const dialogRef = this.dialog.open(comingSoonDialogTestimonhome, {
   
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
export class comingSoonDialogTestimonhome {

  constructor(
    public dialogRef: MatDialogRef<comingSoonDialogTestimonhome>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
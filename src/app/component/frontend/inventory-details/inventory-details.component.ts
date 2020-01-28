import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { ApiService } from '../../../api.service';
// import { BasicInventorySearchBackendComponent } from '../inventory/basic-inventory-search-backend/basic-inventory-search-backend.component';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import {DetailServiceService} from '../../../detail-service.service'
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-inventory-details',
  templateUrl: './inventory-details.component.html',
  styleUrls: ['./inventory-details.component.css']
})
export class InventoryDetailsComponent implements OnInit {

  carouselOptions = {
    margin: 5,
    nav: true,
    loop: false,
    rewind: true,
    autoplayTimeout: 6000,
    autoplay: false,
    autoplayHoverPause: true,
    center: true,
    responsiveClass: true,
    dots: false,
    navText: ["<div class='nav-btn prev-slide'><i class='material-icons'>keyboard_backspace</i></div>", "<div class='nav-btn next-slide'><i class='material-icons'>keyboard_backspace</i></div>"],
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      600: {
        items: 2,
        nav: true,
      },
      991: {
        items: 4,
        nav: true,
      },
      992: {
        items: 4,
        nav: true,
      }
    }
  }

  public TestimonialListArray: any = [];
  public data: any;
  public indexImg: any;
  public message: any = "Are you sure you want to delete this?";
  public saveList: any;
  public indexVal: any = 4;
  public makeName: any;
  public user_details: any;
  public user_id: any;
  public customerList: any;
  public customer_id: any;
  public errorMsg: any = 'Please Choose customer';
  public carData: any;
  public addedCar: any = '';
  public searchRecord:any;

  constructor(public activatedRoute: ActivatedRoute, public apiService: ApiService,
    
    public cookieService: CookieService, public snack: MatSnackBar, public dialog: MatDialog, public router: Router,public detailService:DetailServiceService,
    private readonly meta: MetaService) { 

      if (this.cookieService.get('user_details') != undefined && this.cookieService.get('user_details') != null && this.cookieService.get('user_details') != '') {
        this.user_details = JSON.parse(this.cookieService.get('user_details'));
        this.user_id = this.user_details._id;
        // console.log(this.user_id);
        console.log('type>>', this.user_details)
  
      }
    }

  ngOnInit() {

    if(this.router.url == '/inventory-details' ){
      this.detailService.currentData.subscribe(res =>{
        console.log('>>>>',res)
        // let result:any
        this.searchRecord=res
        // console.log('ressssssss>>>>',this.searchRecord)
  
       this.data = this.searchRecord.carData;
       console.log(this.data)
      })
  
      }

      // customer list for rep

    // if (this.user_details.type == "salesrep") {
    //   let data: any = {
    //     endpoint: 'datalist',
    //     source: 'user',
    //     condition: {
    //       "salesrep": this.user_id,
    //       "type": "customer"
    //     }
    //   }
    //   this.apiService.getDatalist(data).subscribe((res: any) => {
    //     this.customerList = res.res;

    //   });

    // }

    


  }



  //show details
  showImage(item: any, i: any) {
    this.indexImg = i
  }

  addCar(val:any){
    console.log(val)
    this.router.navigateByUrl('/login' + this.router.url)

  }








}

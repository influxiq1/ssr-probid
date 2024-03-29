import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';
// import { BasicInventorySearchBackendComponent } from '../inventory/basic-inventory-search-backend/basic-inventory-search-backend.component';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import {DetailServiceService} from '../../../detail-service.service'
import { MetaService } from '@ngx-meta/core';


export interface DialogData {
  errorMsg: string;
}


@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.css']
})
export class InventoryDetailComponent implements OnInit {

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

        this.meta.setTitle('ProBid Auto - Inventory Detail');
        this.meta.setTag('og:title', 'ProBid Auto - Inventory Detail');
        this.meta.setTag('twitter:title', 'ProBid Auto - Inventory Detail');
        this.meta.setTag('og:type', 'website');
        this.meta.setTag('og:image', '../../assets/images/logomain.png');
        this.meta.setTag('twitter:image', '../../assets/images/logomain.png');


    if (this.cookieService.get('user_details') != undefined && this.cookieService.get('user_details') != null && this.cookieService.get('user_details') != '') {
      this.user_details = JSON.parse(this.cookieService.get('user_details'));
      this.user_id = this.user_details._id;

     // console.log(this.user_id);
      // console.log('type>>', this.user_details.type)

    }
  }

  ngOnInit() {

    if(this.router.url == '/search-detail' ){
    this.detailService.currentData.subscribe(res =>{
      // console.log('>>>>',res)
      // let result:any
      this.searchRecord=res
      // console.log('ressssssss>>>>',this.searchRecord)

     this.data = this.searchRecord.carData;
    })

    }

    //   //for save search & rsvp
    if (this.router.url != '/search-detail') {

      this.activatedRoute.data.forEach((res) => {
        let result: any
        result = res.inventory_details.res;

        this.data = result[0];

        // this.makeName = this.data.build.make;

      });

    }

    // customer list for rep

    if (this.user_details.type == "salesrep") {
      let data: any = {
        endpoint: 'datalist',
        source: 'user',
        condition: {
          "salesrep": this.user_id,
          "type": "customer"
        }
      }
      this.apiService.getDatalist(data).subscribe((res: any) => {
        this.customerList = res.res;

      });

    }

    // rsvp data 
    if (this.activatedRoute.snapshot.routeConfig.path == 'rsvp-detail/:_id') {
      let data: any ;
      if(this.user_details.type == 'salesrep'){
        data= {
          source: 'send_rsvp_view',
          condition: {
            added_by_object: this.user_id
          }
        }
      }
      if(this.user_details.type == 'customer'){
        data= {
          source: 'send_rsvp_view',
          condition: {
            added_for_object: this.user_id
          }
        }
      }
     
      this.apiService.CustomRequest(data,'datalist').subscribe((res: any) => {

        this.saveList = res.res;

        // console.log('>>>>',this.saveList)



      });

    }
    //save search data admin ,rep, customer
    if(this.activatedRoute.snapshot.routeConfig.path == 'inventory-detail/:_id') {
      let data: any = {
        source: 'save_favorite_view',
        condition: {
          added_by: this.user_id
        }
      }
      this.apiService.CustomRequest(data,'datalist').subscribe((res: any) => {

        this.saveList = res.res;


      });
    }

    //for admin rsvp
    if (this.activatedRoute.snapshot.routeConfig.path == 'rsvp-detail/:_id'
      && this.user_details.type == 'admin') {
      let data: any = {
        source: 'send_rsvp_view',
      }
      this.apiService.getDataForDatalist(data).subscribe((res: any) => {

        this.saveList = res.res;


      });

    }



  }

  //show details
  showImage(item: any, i: any) {
    this.indexImg = i
  }

  

  //for rsvp send
  addRsvp(itemData: any) {
    // console.log('val-rsvp', itemData)

    //for rep rsvp
    if (this.user_details.type == 'salesrep') {

      if (this.customer_id != '' && this.customer_id != null) {
        let endpoint: any = "addorupdatedata";
        itemData.added_by = this.user_id;
        itemData.status = 0;

        itemData.added_for = this.customer_id;

        let card_data: any = {
          card_data: itemData
        }
        let data: any = {
          data: card_data,
          source: "send_for_rsvp",
        };
        this.apiService.CustomRequest(data, endpoint).subscribe((res: any) => {
          if (res.status == "success") {


            this.snack.open('RSVP Added Successfully', 'Ok', {
              duration: 2000
            })
            this.router.navigateByUrl('/rsvp-salesrep');

            let data: any = {
              id: itemData._id,
              source: 'save_favorite'
            }
            this.apiService.deleteSingleData1(data).subscribe((res: any) => {
              if (res.status == 'success') {
                // console.log('success')
              }
            })

          }
        });
      }
      else {

        this.customer_id = ''
        this.errorMsg;

      }

    }

    //for customer rsvp

    if (this.user_details.type == 'customer') {

      let endpoint: any = "addorupdatedata";
      itemData.added_by = this.user_details.salesrep;
      itemData.status = 0;

      itemData.added_for = this.user_id;

      let card_data: any = {
        card_data: itemData
      }
      let data: any = {
        data: card_data,
        source: "send_for_rsvp",
      };
      this.apiService.CustomRequest(data, endpoint).subscribe((res: any) => {
        if (res.status == "success") {

          this.snack.open('RSVP Added Successfully', 'Ok', {
            duration: 2000
          })
          this.router.navigateByUrl('/rsvp-customer');

          let data: any = {
            id: itemData._id,
            source: 'save_favorite'
          }
          this.apiService.deleteSingleData1(data).subscribe((res: any) => {
            if (res.status == 'success') {

            }
          })


        }
      })

    }

  }
  //remove rsvp and save data

  removeItem(val: any) {
    // console.log('remove-item', val)
    const dialogRef = this.dialog.open(RemoveRsvpComponent, {
      width: '250px',
      data: this.message

    });
    dialogRef.afterClosed().subscribe(result => {
      let data: any ;
      if (result == 'yes') {

        if (this.activatedRoute.snapshot.routeConfig.path == 'inventory-detail/:_id') {

           data= {
            id: val,
            source: 'save_favorite'
          }

        }
        if (this.activatedRoute.snapshot.routeConfig.path == 'rsvp-detail/:_id') {

          data = {
            id: val,
            source: 'send_for_rsvp'
          }
        }

        this.apiService.deleteSingleData1(data).subscribe((res: any) => {
          if (res.status == 'success') {

            this.snack.open('Record Removed Successfully..!', 'Ok', { duration: 2000 })


            if (this.user_details.type == 'admin' &&
              this.activatedRoute.snapshot.routeConfig.path == 'inventory-detail/:_id') {
              this.router.navigateByUrl('/save-search-admin');
            }

            if (this.user_details.type == 'admin' &&
              this.activatedRoute.snapshot.routeConfig.path == 'rsvp-detail/:_id') {
              this.router.navigateByUrl('/rsvp-admin');
            }

            if (this.user_details.type == 'salesrep' &&
              this.activatedRoute.snapshot.routeConfig.path == 'inventory-detail/:_id') {
              this.router.navigateByUrl('//save-search-rep');
            }

            if (this.user_details.type == 'salesrep' &&
              this.activatedRoute.snapshot.routeConfig.path == 'rsvp-detail/:_id') {
              this.router.navigateByUrl('/rsvp-salesrep');
            }

            if (this.user_details.type == 'customer' &&
              this.activatedRoute.snapshot.routeConfig.path == 'inventory-detail/:_id') {
              this.router.navigateByUrl('/save-search-castomer');
            }

            if (this.user_details.type == 'customer' &&
              this.activatedRoute.snapshot.routeConfig.path == 'rsvp-detail/:_id') {
              this.router.navigateByUrl('/rsvp-customer');
            }


          }
        })
      }
    })

  }

  //remove data for search-details page
  removeAddSave(val: any, item: any) {
    // console.log('val++>>', val, item)
    const dialogRef = this.dialog.open(RemoveRsvpComponent, {
      width: '250px',
      data: this.message

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result == 'yes') {
        let data: any = {
          id: val,
          source: 'save_favorite'
        }
        this.apiService.deleteSingleData1(data).subscribe((res: any) => {
          if (res.status == 'success') {
            this.snack.open('Record Removed Successfully..!', 'Ok', { duration: 2000 })

            // this.removeCar=result.res;
             //for admin
    if (this.router.url == '/search-detail'
    && this.user_details.type == 'admin') {
    this.router.navigateByUrl('/basic-inventory-search-admin');
     }
  

  // for salesrep 


  if (this.router.url == '/search-detail'
    && this.user_details.type == 'salesrep') {
    this.router.navigateByUrl('/basic-inventory-search-rep');
  }
  

  // for customer 

  if (this.router.url == '/search-detail'
    && this.user_details.type == 'customer') {
    this.router.navigateByUrl('/basic-inventory-search-customer');
  }

          }
        })
      }
    })

  }


  //for details from similar vehical
  inventoryDetails(val:any) {
    // console.log('id>>', val)
    if (this.activatedRoute.snapshot.routeConfig.path == 'rsvp-detail/:_id') {
      this.router.navigateByUrl('/rsvp-detail/' + val)
    }

    if (this.activatedRoute.snapshot.routeConfig.path == 'inventory-detail/:_id') {
      this.router.navigateByUrl('/inventory-detail/' + val)

    }

  }

  //view all from similar vehical
  viewAll() {
    //for admin
    if (this.activatedRoute.snapshot.routeConfig.path == 'rsvp-detail/:_id'
      && this.user_details.type == 'admin') {
      this.router.navigateByUrl('/rsvp-admin');
    }
    if (this.activatedRoute.snapshot.routeConfig.path == 'inventory-detail/:_id'
      && this.user_details.type == 'admin') {
      this.router.navigateByUrl('/save-search-admin');
    }

    // for salesrep 


    if (this.activatedRoute.snapshot.routeConfig.path == 'rsvp-detail/:_id'
      && this.user_details.type == 'salesrep') {
      this.router.navigateByUrl('/rsvp-salesrep');
    }
    if (this.activatedRoute.snapshot.routeConfig.path == 'inventory-detail/:_id'
      && this.user_details.type == 'salesrep') {
      this.router.navigateByUrl('/save-search-rep');
    }

    // for customer 

    if (this.activatedRoute.snapshot.routeConfig.path == 'rsvp-detail/:_id'
      && this.user_details.type == 'customer') {
      this.router.navigateByUrl('/rsvp-customer');
    }
    if (this.activatedRoute.snapshot.routeConfig.path == 'inventory-detail/:_id'
      && this.user_details.type == 'customer') {
      this.router.navigateByUrl('/save-search-castomer');
    }

  }

  //add car 

  addCar(itemData: any) {

    let endpoint: any = "addorupdatedata";
    itemData.added_by = this.user_id;
    let card_data: any = {
      card_data: itemData
    }
    let data: any = {
      data: card_data,
      source: "save_favorite",
    };
    // console.log(data)
    this.apiService.CustomRequest(data, endpoint).subscribe((res: any) => {
      // console.log(res);
      if (res.status == "success") {
        this.snack.open('RSVP Saved Into Your Favorite..!', 'Ok', { duration: 2000 })

        this.addedCar = res.res


      }
    });

  }

}


//modal for remove record

@Component({
  selector: 'app-removeRsvp',
  templateUrl: './removeRsvp.html'
})
export class RemoveRsvpComponent {
  constructor(public dialogRef: MatDialogRef<RemoveRsvpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }
}

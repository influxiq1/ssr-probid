import { Component, OnInit, Inject } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { ApiService } from '../../../../api.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable, Subject, Subscription,Subscriber } from 'rxjs';
import { AppComponent } from '../../../../app.component';
import {DetailServiceService} from '../../../../detail-service.service'

export interface DialogData {
  errorMsg: string;
}

@Component({
  selector: 'app-basic-inventory-search-backend',
  templateUrl: './basic-inventory-search-backend.component.html',
  styleUrls: ['./basic-inventory-search-backend.component.css']
})
export class BasicInventorySearchBackendComponent implements OnInit {

  public MediaListArray: any = [];
  public favoriteSeason: any;

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
        items: 3,
        nav: true,
      },
      600: {
        items: 4,
        nav: true,
      },
      991: {
        items: 5,
        nav: true,
      },
      992: {
        items: 8,
        nav: true,
      }
    }
  }

  public errorMsg: any = 'Please select Customer name';
  public indexval: any = 4;
  public inventoryCustomerForm: FormGroup;
  public stateList: any;
  public inventory_search_list: any;
  public make_list: any;
  public type_list: any;
  public model_list: any;
  public year_list: any;
  public type: string = '';
  public year: string = '';
  public make: string = '';
  public model: string = '';
  public vin: string = '';
  public trim: string = '';
  public vehicle: string = '';
  public state: string = '';
  public zip: string = '';
  public search: any;
  public user_details: any;
  public user_id: string = '';
  public modalImg: string = '';
  public isFavorite: number = 0;
  public customerList: any = '';
  public customer_id: any = '';
  public trim_list: any;
  public vehicle_list: any;
  public indexCount: number;
  public indexCountForImg: number;
  public indexForCustomer: number;
  public spinnerval: any = 0;
  public car_data: any;
 
  // public carItem=new Subject<any>();

  constructor(
    public fb: FormBuilder,
    public apiService: ApiService,
    public activatedRoute: ActivatedRoute,
    public http: HttpClient,
    private readonly meta: MetaService,
    public dialog: MatDialog,
    public cookieService: CookieService,
    public router: Router,
    public snackBar: MatSnackBar,
    public apploader: AppComponent,
    public detailService:DetailServiceService

  ) {
    this.spinnerval = 0;


    if (this.cookieService.get('user_details') != undefined && this.cookieService.get('user_details') != null && this.cookieService.get('user_details') != '') {
      this.user_details = JSON.parse(this.cookieService.get('user_details'));
      this.user_id = this.user_details._id;
      // console.log(this.user_id);


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
          // console.log('++++++++++++++', this.customerList);
        });

      }

    }

    this.generateForm();
    this.getStateList();
  }

  ngOnInit() {

    // console.log("<>>",JSON.parse(this.cookieService.get('car_data')))
    // this.cookieService.delete('car_data')
    // if (this.cookieService.get('car_Data') != null || this.cookieService.get('car_Data') != '' ) {
      this.cookieService.delete('car_Data');
    //   console.log("<>>",this.cookieService.get('car_Data'))
     
    // } 


    this.activatedRoute.data.forEach((data) => {
      this.inventory_search_list = data.inventory_search
      // this.make_list = this.inventory_search_list.result.manage_make;
      // console.log('$$$$>>>',this.make_list)
      // this.model_list = this.inventory_search_list.result.manage_model;
      // this.type_list = this.inventory_search_list.result.manage_type;
      this.year_list = this.inventory_search_list.result.manage_year;
    })

   
  }

  searchAutoComplete(event: any, field: string) {
    this.apploader.loader = 1;
    let input: string = '';
    let inputField: string = '';
    if (event.target.value != null && event.target.value != '' && event.target.value.length >= 0) {
      input = "&input=" + event.target.value;
    }
    if (field != null && field != '' && field.length >= 0) {
      inputField = "&field=" + field;
    }

    if (inputField != '' && (input != '' || this.type != '' || this.year != '' || this.make != '' || this.vin != '' || this.trim != '' || this.vehicle != '' || this.state != '' || this.zip != '' || this.model != '')) {
      let search_url: string = this.apiService.inventory_auto_complete_url + inputField + input + this.type + this.make + "&country=US&ignore_case=true&term_counts=false&sort_by=index";

      this.http.get(search_url).subscribe((res: any) => {
        this.apploader.loader = 0;
        if (field == 'make') {
          this.make_list = res.terms;
          // console.log(field, this.make_list);
        }
        if (field == 'model') {
          this.model_list = res.terms;
          // console.log(field);
        }
        if (field == 'body_type') {
          this.type_list = res.terms;
          // console.log(field, this.type_list);
        }
        if (field == 'trim') {
          this.trim_list = res.terms;
          // console.log(field, this.trim_list);
        }
        if (field == 'vehicle_type') {
          this.vehicle_list = res.terms;
          // console.log(field, this.vehicle_list);
        }

      });
    }

  }

  getStateList() {
    this.apiService.getJsonObject('assets/data/states.json').subscribe((response: any) => {
      this.stateList = response;
    });
  }


  generateForm() {
    this.inventoryCustomerForm = this.fb.group({
      type: [''],
      make: [''],
      model: [''],
      year: [''],
      vehicle: [''],
      trim: [''],
      vin: [''],
      state: [''],
      zip: [''],

    })
  }


  inventoryCustomerSearch() {


    if (this.inventoryCustomerForm.valid) {
      this.apploader.loader = 1;

      let yearVal = this.inventoryCustomerForm.value.year;
      let typeVal = this.inventoryCustomerForm.value.type;
      let makeVal = this.inventoryCustomerForm.value.make;
      let modelVal = this.inventoryCustomerForm.value.model;
      let vinVal = this.inventoryCustomerForm.value.vin;
      let trimVal = this.inventoryCustomerForm.value.trim;
      let vehicleVal = this.inventoryCustomerForm.value.vehicle;
      let stateVal = this.inventoryCustomerForm.value.state;
      let zipVal = this.inventoryCustomerForm.value.zip;

      if (typeVal != null && typeVal != '' && typeVal.length >= 0) {
        this.type = "&0seller_type=" + typeVal;
      }
      if (yearVal != null && yearVal != '' && yearVal.length >= 0) {
        this.year = "&year=" + yearVal;
      }
      if (makeVal != null && makeVal != '' && makeVal.length >= 0) {
        this.make = "&make=" + makeVal;
      }
      if (modelVal != null && modelVal != '' && modelVal.length >= 0) {
        this.model = "&model=" + modelVal;
      }
      if (vinVal != null && vinVal != '' && vinVal.length >= 0) {
        this.vin = "&vin=" + vinVal;
      }
      if (trimVal != null && trimVal != '' && trimVal.length >= 0) {
        this.trim = "&trim=" + trimVal;
      }
      if (vehicleVal != null && vehicleVal != '' && vehicleVal.length >= 0) {
        this.vehicle = "&vehicle_type=" + vehicleVal;
      }
      if (stateVal != null && stateVal != '' && stateVal.length >= 0) {
        this.state = "&state=" + stateVal;
      }
      if (zipVal != null && zipVal != '' && zipVal.length >= 0) {
        this.zip = "&zip=" + zipVal;
      }
      if (this.type != '' || this.year != '' || this.make != '' || this.vin != '' || this.trim != '' || this.vehicle != '' || this.state != '' || this.zip != '' || this.model != '') {

        this.spinnerval = 1;


        let search_link = this.apiService.inventory_url + this.type + this.year + this.make + this.vin + this.trim + this.vehicle + this.state + this.zip + this.model;

        this.http.get(search_link).subscribe((res: any) => {
this.apploader.loader = 0;
          this.search = res.listings;

          // console.log('search list', this.search)

        })
        this.spinnerval = 0;

      }
      // else {
      //   this.errorMsg = "Please select at least one field";

      //   const dialogRef = this.dialog.open(errorDialogbackend, {
      //     width: '250px',
      //     data: { errorMsg: this.errorMsg }
      //   });

      // }





    }

  }


  gotologin() {
    this.router.navigateByUrl('/login' + this.router.url)
    // console.log('/login' + this.router.url)
  }



  favorite(item: any) {


    // console.log('this is favorite ')
    if (this.user_id == '') {
      this.cookieService.set('favorite_car', item);
      setTimeout(() => {
        this.gotologin();
      }, 500);

    }
    else {
      this.cookieService.get('favorite_car')
      let endpoint: any = "addorupdatedata";
      item.added_by = this.user_id;
      let card_data: any = {
        card_data: item
      }
      let data: any = {
        data: card_data,
        source: "save_favorite",
      };
      // console.log(data)
      this.apiService.CustomRequest(data, endpoint).subscribe((res: any) => {
        // console.log(res);
        if (res.status == "success") {

          item.addedToFavourite = 1;

          this.snackBar.open('RSVP Saved Into Your Favorite..!', 'Ok', { duration: 2000 })
        }
      });
    }

  }
  // customerForRsvp(val: any, index: any){
  //   this.customer_msg = val;
  //   this.valIndex = index;
  // }

  rsvpSend(item: any) {

    // console.log('rsvpSend>>', item)

    let userType = this.user_details.type
    // console.log('>>>>++>>', userType)

    if (this.user_details.type == 'salesrep') {

      if (item.customer_id != '' && item.customer_id != null) {
        let endpoint: any = "addorupdatedata";
        item.added_by = this.user_id;
        item.status = 0;
        if (this.user_details.type == 'salesrep') {
          item.added_for = item.customer_id;
          item.added_by_salesrep = 1;
          // console.log('added_for >>', item.added_for);
        } else {
          item.added_for = this.user_id;
        }
        let card_data: any = {
          card_data: item
        }
        let data: any = {
          data: card_data,
          source: "send_for_rsvp",
        };
        // console.log(data)
        this.apiService.CustomRequest(data, endpoint).subscribe((res: any) => {
          // console.log(res);
          if (res.status == "success") {

            item.rsvpSend = 1

            this.snackBar.open('RSVP Added Successfully', 'Ok', {
              duration: 2000
            })
          }
        });
      }

      else {

        item.customer_id = ''
        this.errorMsg;
        // console.log(this.errorMsg)

      }
    }
    if (this.user_details.type == 'customer') {

      let endpoint: any = "addorupdatedata";
      item.added_by = this.user_details.salesrep;
      item.status = 0;

      item.added_for = this.user_id;

      let card_data: any = {
        card_data: item
      }
      let data: any = {
        data: card_data,
        source: "send_for_rsvp",
      };
      // console.log(data)
      this.apiService.CustomRequest(data, endpoint).subscribe((res: any) => {
        // console.log(res);
        if (res.status == "success") {


          item.rsvpSend = 1


          this.snackBar.open('RSVP Added Successfully', 'Ok', {
            duration: 2000
          })



        }
      })

    }


  }

  showimg(i: any, j: any) {
    // console.log('+++', i, j)
    this.indexCount = i;
    this.indexCountForImg = j;
  }


  loadMoreSearchResult() {
    this.indexval = this.indexval + 2;

  }

  // for observeable
  public viewDetails(data:any):any {
    console.log('data_item >>',data)
    let carData={
      carData: data
    };

    this.detailService.carData(carData)
    setTimeout(() => {
      this.router.navigate(['/search-detail']);
    }, 500);
   
  }

}

import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { ApiService } from '../../../../api.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IfStmt } from '@angular/compiler';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-advance-inventory-search-backend',
  templateUrl: './advance-inventory-search-backend.component.html',
  styleUrls: ['./advance-inventory-search-backend.component.css']
})
export class AdvanceInventorySearchBackendComponent implements OnInit {

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


  public indexval:any=10;
  public advanceInventoryCustomerForm: FormGroup;
  public stateList: any;
  public inventory_search_list: any;
  public make_list: any;
  public type_list: any;
  public model_list: any;
  public year_list: any;
  public trim_list: [];
  public type = '';
  public year = '';
  public make = '';
  public model = '';
  public trim = '';
  public vin = '';
  public vehicle = '';
  public state = '';
  public zip = '';
  public search = '';
  public excolor ='';
  public incolor='';
  public fuel='';
  public exColor:any='';
  public inColor:any='';
  public drivetrain:any='';
  public cylinder:any='';
  public inventory_url;
  public inventory_auto_complete_url:any;
  public transmissiontypeList: any='';
  public doorsqtyList: any='';
  public doorsqty: any='';
  public odometerList: any='';
  public enginetypeList: any='';
  public odometer: any='';
  public odometer1: any='';
  public enginetype: any='';
  public transmissiontype: any='';
  public excolorList:any;
  public indexCountForImg:any;
  public indexCount:any;
  public user_details: any;
  public incolorList:any;
  
  constructor(public fb: FormBuilder,
    public apiService: ApiService,
    public activatedRoute: ActivatedRoute,
    public http: HttpClient,
    private readonly meta: MetaService, public cookieService: CookieService, public router: Router) {

      if (this.cookieService.get('user_details') != undefined && this.cookieService.get('user_details') != null && this.cookieService.get('user_details') != '') {
        this.user_details = JSON.parse(this.cookieService.get('user_details'));

        // console.log(this.userCookies);
        }


    // this.meta.setTitle('ProBid Auto - Advance Inventory Search');
    // this.meta.setTag('og:description', 'Locate the Pre-Owned Car of your desire at the ProBid Auto Inventory using Basic, as well as Advanced, Search Parameters to make your Car Search easy and convenient, while also saving you loads of time, effort and money');
    // this.meta.setTag('twitter:description', 'Locate the Pre-Owned Car of your desire at the ProBid Auto Inventory using Basic, as well as Advanced, Search Parameters to make your Car Search easy and convenient, while also saving you loads of time, effort and money');

    // this.meta.setTag('og:keyword', 'Pre-Owned Car Inventory, ProBid Auto Vehicle Inventory, ProBid Auto Inventory');
    // this.meta.setTag('twitter:keyword', 'Pre-Owned Car Inventory, ProBid Auto Vehicle Inventory, ProBid Auto Inventory');

    // this.meta.setTag('og:title', 'ProBid Auto - Inventory');
    // this.meta.setTag('twitter:title', 'ProBid Auto - Inventory');
    // this.meta.setTag('og:type', 'website');
    // this.meta.setTag('og:image', '../../assets/images/logomain.png');
    // this.meta.setTag('twitter:image', '../../assets/images/logomain.png');

    this.meta.setTitle('ProBid Auto - Advance inventory search');
    this.meta.setTag('og:title', 'ProBid Auto - Advance inventory search');
    this.meta.setTag('twitter:title', 'ProBid Auto - Advance inventory search');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', '../../assets/images/logomain.png');
    this.meta.setTag('twitter:image', '../../assets/images/logomain.png');

    this.generateForm();
    this.getStateList();
    this.getodometerList();
    this.getenginetypeList();
    this.gettransmissiontypeList();
    this.getdoorsqtyList();
    this.getExColorList();
    this.getInColorList();
    this.inventory_url=(this.cookieService.get('inventory_url'));
    this.inventory_auto_complete_url=(this.cookieService.get('inventory_auto_complete_url'));

    // console.log( this.inventory_auto_complete_url);
  }

  ngOnInit() {
    //for make,model,year,type drop down list
    this.activatedRoute.data.forEach((data) => {
      this.inventory_search_list = data.inventory_search
      // this.make_list = this.inventory_search_list.result.manage_make;
      // this.model_list = this.inventory_search_list.result.manage_model;
      // this.type_list = this.inventory_search_list.result.manage_type;
      this.year_list = this.inventory_search_list.result.manage_year;
      // console.log('>>>>>>', this.inventory_search_list)
    })
  }

  getStateList() {
    this.apiService.getJsonObject('assets/data/states.json').subscribe(response => {
      let result: any = {};
      result = response;
      this.stateList = result;
      // console.log(this.stateList)
    })
  }

  getodometerList() {
    this.apiService.getJsonObject('assets/data/odometer.json').subscribe(response => {
      let result: any = {};
      result = response;
      this.odometerList = result;
    })
  }

  getenginetypeList() {
    this.apiService.getJsonObject('assets/data/enginetype.json').subscribe(response => {
      let result: any = {};
      result = response;
      this.enginetypeList = result;
      // console.log(this.enginetypeList);
    })
  }

  gettransmissiontypeList() {
    this.apiService.getJsonObject('assets/data/transmission.json').subscribe(response => {
      let result: any = {};
      result = response;
      this.transmissiontypeList = result;
      // console.log(this.transmissiontypeList);
    })
  }

  getdoorsqtyList() {
    this.apiService.getJsonObject('assets/data/doors.json').subscribe(response => {
      let result: any = {};
      result = response;
      this.doorsqtyList = result;
      // console.log(this.transmissiontypeList);
    })
  }

  getExColorList() {
    this.apiService.getJsonObject('assets/data/exterior-color.json').subscribe(response => {
      let result: any = {};
      result = response;
      this.excolorList = result;
      // console.log(this.excolorList = result);
    })
  }

  getInColorList() {
    this.apiService.getJsonObject('assets/data/interior-color.json').subscribe(response => {
      let result: any = {};
      result = response;
      this.incolorList = result;
      // console.log(this.excolorList = result);
    })
  }



  generateForm() {
    this.advanceInventoryCustomerForm = this.fb.group({
      type: [''],
      make: [''],
      model: [''],
      year: [''],
      vehicle: [''],
      trim: [''],
      vin: [''],
      state: [''],
      zip: [''],
      odometer: [''],
      odometer1: [''],
      enginetype: [''],
      transmissiontypelist: [''],
      doorsqty:[''],
      drivetrain:[''],
      fuel:[''],
      cylinder:[''],
     


    })
  }

  // advanceInventoryCustomerSearch() {
  //   if (this.advanceInventoryCustomerForm.valid) {
  //     let yearVal = this.advanceInventoryCustomerForm.value.year;
  //     let typeVal = this.advanceInventoryCustomerForm.value.type;
  //     let makeVal = this.advanceInventoryCustomerForm.value.make;
  //     let modelVal = this.advanceInventoryCustomerForm.value.model;

  //     if (typeVal != null && typeVal != '' && typeVal.length >= 0) {
  //       this.type = "&0seller_type=" + typeVal
  //     }
  //     if (yearVal != null && yearVal != '' && yearVal.length >= 0) {
  //       this.year = "&year=" + yearVal
  //     }
  //     if (makeVal != null && makeVal != '' && makeVal.length >= 0) {
  //       this.make = "&make=" + makeVal
  //     }
  //     let search_link = this.apiService.inventory_url + this.type + this.year + this.make;
  //     this.http.get(search_link).subscribe((res: any) => {
  //       console.log('>>>>', res.listings)

  //     })

  //   }

  // }


  toggleCheckEx(event:any,item:any){
    item.checked = !item.checked;
    console.log(item)
    if(item.checked == true){
      this.excolor=item.color;
      console.log('>>',this.excolor)

    }
   }

  toggleCheckIn(event:any,item:any){
    item.checked = !item.checked;
    console.log(item)
    if(item.checked == true){
      this.incolor=item.color;
      console.log(this.incolor)

    } 
  }

  advanceInventoryCustomerSearch(){

    if(this.advanceInventoryCustomerForm.valid){
      let yearVal = this.advanceInventoryCustomerForm.value.year;
      let typeVal = this.advanceInventoryCustomerForm.value.type;
      let makeVal = this.advanceInventoryCustomerForm.value.make;
      let modelVal = this.advanceInventoryCustomerForm.value.model;
      let vinVal = this.advanceInventoryCustomerForm.value.vin;
      let trimVal = this.advanceInventoryCustomerForm.value.trim;
      let vehicleVal = this.advanceInventoryCustomerForm.value.vehicle;
      let stateVal = this.advanceInventoryCustomerForm.value.state;
      let zipVal = this.advanceInventoryCustomerForm.value.zip;
      let odometerVal = this.advanceInventoryCustomerForm.value.odometer;
      let odometer1Val = this.advanceInventoryCustomerForm.value.odometer1;
      let enginetypeVal = this.advanceInventoryCustomerForm.value.enginetype;
      let transmissiontypeVal = this.advanceInventoryCustomerForm.value.transmissiontypelist;
      let doorsqtyVal = this.advanceInventoryCustomerForm.value.doorsqty;
      let drivetrainVal=this.advanceInventoryCustomerForm.value.drivetrain
      let fuelVal=this.advanceInventoryCustomerForm.value.fuel
      let cylinderVal=this.advanceInventoryCustomerForm.value.cylinder
      let exColorVal= this.excolor;
      let  inColorVal= this.incolor;

      // console.log('>>>>',yearVal,typeVal,makeVal,modelVal,vinVal,trimVal,vehicleVal,stateVal,zipVal,odometerVal,odometer1Val,drivetrainVal,fuelVal,cylinderVal,enginetypeVal,transmissiontypeVal,doorsqtyVal,exColorVal,inColorVal)




      if(typeVal !=null &&typeVal !='' && typeVal.length >= 0){
        this.type = "&body_type=" +typeVal;
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
      if (odometerVal != null && odometerVal != '' && odometerVal.length >= 0) {
        this.odometer = "&odometer=" + odometerVal;
      }
      if (odometer1Val != null && odometer1Val != '' && odometer1Val.length >= 0) {
        this.odometer1 = "&odometer1=" + odometer1Val;
      }
      if (enginetypeVal != null && enginetypeVal != '' && enginetypeVal.length >= 0) {
        this.enginetype = "&enginetype=" + enginetypeVal;
      }
      if (transmissiontypeVal != null && transmissiontypeVal != '' && transmissiontypeVal.length >= 0) {
        this.transmissiontype = "&transmissiontype=" + transmissiontypeVal;
      }
      if (doorsqtyVal != null && doorsqtyVal != '' && doorsqtyVal.length >= 0) {
        this.doorsqty = "&doorsqty=" + doorsqtyVal;
      }

      if (drivetrainVal != null && drivetrainVal != '' && drivetrainVal.length >= 0) {
        this.drivetrain = "&drivetrain=" + drivetrainVal;
      }
      if (fuelVal != null && fuelVal != '' && fuelVal.length >= 0) {
        this.fuel = "&fuel_type=" + fuelVal;
      }
      if (cylinderVal != null && cylinderVal != '' && cylinderVal.length >= 0) {
        this.cylinder = "&cylinders=" + cylinderVal;
      }
      if (exColorVal != null && exColorVal != '' && exColorVal.length >= 0) {
        this.exColor = "&exterior_color=" + exColorVal;
      }
      if (inColorVal != null && inColorVal != '' && inColorVal.length >= 0) {
        this.inColor = "&interior_color=" + inColorVal;
      }


      if (this.type != '' || this.year != '' || this.make != '' || this.vin != '' || this.trim != '' || this.vehicle != '' || this.state != '' || this.zip != '' ||this.odometer != '' || this.odometer1 != '' || this.enginetype != '' || this.transmissiontype != '' || this.doorsqty != '' || this.model != '' || this.drivetrain != ''|| this.fuel != ''|| this.cylinder != ''|| this.exColor != ''|| this.inColor != '' ) {

        let search_link = this.inventory_url + this.type + this.year + this.make + this.vin + this.trim + this.vehicle + this.state + this.zip + this.odometer + this.odometer1 + this.enginetype + this.transmissiontype + this.doorsqty + this.model+ this.drivetrain+this.fuel+this.cylinder+this.exColor+this.inColor + '&rows=50';

        this.http.get(search_link).subscribe((res: any) => {
          console.log(res)
          this.search = res.listings;
       
        })
      } else {
        // this.errorMsg = "Please select at least one field";

        // const dialogRef = this.dialog.open(errorDialog, {
        //   width: '250px',
        //   data: { errorMsg: this.errorMsg }
        // });

      }

    }

  }

  //for auto complete

  searchAutoComplete(event: any, field: string){

    let input: string = '';
    let inputField: string = '';
    if (event.target.value != null && event.target.value != '' && event.target.value.length >= 0) {
      input = "&input=" + event.target.value;
    }
    if (field != null && field != '' && field.length >= 0) {
      inputField = "&field=" + field;
    }


    if (inputField != '' && ( input !='' || this.type != '' || this.year != '' || this.make != '' || this.vin != '' || this.trim != '' || this.state != '' || this.zip != '' || this.odometer != '' || this.odometer1 != '' || this.enginetype != '' || this.transmissiontype != '' || this.doorsqty != '' || this.model != '')) {
      let search_url: string = this.inventory_auto_complete_url+ inputField + input + this.type + this.make +"&country=US&ignore_case=true&term_counts=false&sort_by=index";
  
      this.http.get(search_url).subscribe((res: any) => {
       
        if (field == 'make') {
          this.make_list = res.terms; 
          // console.log(field, this.make_list);
        }
        if (field == 'model') {
          this.model_list = res.terms; 
          // console.log(field,this.model_list); 
        }
        if (field == 'body_type') {
          this.type_list = res.terms; 
          // console.log(field, this.type_list); 
        }
        if (field == 'trim') {
          this.trim_list = res.terms; 
          // console.log(field, this.trim_list); 
        }
  
      });
    }


  }

  showimg(i:any,j:any){
    // console.log('>>',i,j)

    this.indexCount=i;
    this.indexCountForImg=j
  }


    loadMoreSearchResult(){
    this.indexval=this.indexval+5;
  }

  

  rsvpSend(val){

  }

  favorite(val){
    
  }

}

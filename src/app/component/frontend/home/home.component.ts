import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ApiService} from '../../../api.service';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public saveCarDataList:any;
  public inventoryCustomerForm: FormGroup;

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
  public make_list: [];
  public type_list: [];
  public model_list: [];
  // public year_list: [];
  public trim_list: [];
  public stateList:any;


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
  public year_list:any;


  constructor(private cdr: ChangeDetectorRef, private readonly meta: MetaService, private router: Router, public activatedRoute: ActivatedRoute,public apiService:ApiService,public fb:FormBuilder,public http:HttpClient) { 
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
      //  console.log('+++++++++++++++++>>>>>>>>>>>>>>',data.home_data.result.blog_list[0])
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

    this.generateForm();
    this.getStateList();
     

   }

   getStateList() {
    this.apiService.getJsonObject('assets/data/states.json').subscribe((response: any) => {
      this.stateList = response;
    });
  }

   //form for inventory search

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

  //for basic inventory search

  inventoryCustomerSearch() {
    if (this.inventoryCustomerForm.valid) {

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
        this.type = "&body_type=" + typeVal;
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

        let search_link = this.apiService.inventory_url + this.type + this.year + this.make + this.vin + this.trim + this.vehicle + this.state + this.zip + this.model+ '&rows=50';

        this.http.get(search_link).subscribe((res: any) => {
          this.search = res.listings;
          console.log('search list',this.search)
            console.log(this.search);
        })
      } 
      // else {
      //   this.errorMsg = "Please select at least one field";

      //   const dialogRef = this.dialog.open(errorDialog, {
      //     width: '250px',
      //     data: { errorMsg: this.errorMsg }
      //   });

      // }


    }

  }


  searchAutoComplete(event: any, field: string) {

    let input: string = '';
    let inputField: string = '';
    if (event.target.value != null && event.target.value != '' && event.target.value.length >= 0) {
      input = "&input=" + event.target.value;
    }
    if (field != null && field != '' && field.length >= 0) {
      inputField = "&field=" + field;
    }

    if (inputField != '' && ( input !='' || this.type != '' || this.year != '' || this.make != '' || this.vin != '' || this.trim != '' || this.vehicle != '' || this.state != '' || this.zip != '' || this.model != '')) {
    let search_url: string = this.apiService.inventory_auto_complete_url+ inputField + input + this.type + this.make +"&country=US&ignore_case=true&term_counts=false&sort_by=index";

    this.http.get(search_url).subscribe((res: any) => {
     
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

    });
  }

  }

  reset() {
    this.inventoryCustomerForm.reset();
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

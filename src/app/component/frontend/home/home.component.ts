import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from '../../../app.component';
import {environment } from '../../../../environments/environment';

declare var $: any;
export interface DialogData {
  errorMsg: string;
  loginMsg: string;
  name: string;
}

// var owl = $('.owl-carousel');

// owl.children().each( function( index ) {
//   $(this).attr( 'data-position', index );
// });


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  public name: string;

  public saveCarDataList: any;
  public inventoryCustomerForm: FormGroup;

  public inventoryPreownForm: FormGroup;

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
  public year_list: [];
  public trim_list: [];
  public stateList: any;
  public user_id: string = '';
  public user_details: any = '';
  public loginMsg: string = '';
  public errorMsg: string = '';
  public apikey: any;
  public sepecialCarList: any;
  public invalidApi:any;

  public slides: any = ["http://dev.probidauto.com/assets/images/probidhome-slide1img.jpg", "http://dev.probidauto.com/assets/images/probidhome-slide1img.jpg", "http://dev.probidauto.com/assets/images/probidhome-slide1img.jpg"];
  carouselBannerOptions = {
    margin: 0,
    nav: true,
    loop: false,
    rewind: true,
    autoplayTimeout: 6000,
    autoplay: false,
    autoplayHoverPause: true,
    center: false,
    responsiveClass: true,
    dots: true,
    autoWidth: true,
    autoHeight: true,
    navText: ["<div class='nav-btn prev-slide'><i class='material-icons'>keyboard_backspace</i></div>", "<div class='nav-btn next-slide'><i class='material-icons'>keyboard_backspace</i></div>"],
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      600: {
        items: 1,
        nav: true,
      },
      991: {
        items: 1,
        nav: true,
      },
      992: {
        items: 1,
        nav: true,
      },
      1199: {
        items: 1,
        nav: true,
      }
    }
  }






  carouselOptions = {

    autoPlay: true,
    singleItem: true,
    transitionStyle: "fade",
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    margin: 5,
    nav: true,
    loop: true,
    center: true,
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
        dot: false,
      }
    }
  }


  public TestimonialListArray: any = [];
  public savedUrl: any = [];
  public savedId: any = [];
  public blogList: any;
  public indexval: any = 3;
  public customerList: any = '';
  public customur_id: any = '';
  public favoriteSeason: any;
  public indexCount: number;
  public indexCountForImg: number;
  public title:any;
  public currentUrl: any;
  public blogtitle:any;
  // public testimonial_img: any = '';
  public inventory_url:any;
  public inventory_auto_complete_url:any;

  public serverUrlDemo =  environment["API_URL"];



  constructor(private cdr: ChangeDetectorRef, private readonly meta: MetaService, private router: Router, public activatedRoute: ActivatedRoute, public apiService: ApiService, public fb: FormBuilder, public http: HttpClient, public dialog: MatDialog, public cookieService: CookieService, public apploader: AppComponent) {
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



    const body = document.getElementsByTagName('body')[0];
    this.currentUrl = this.router.url;
    if (this.currentUrl == '/home') {
      body.classList.add('googlemaphome')
    } else {
      body.classList.remove('googlemaphome')
    }


    if (this.cookieService.get('user_details') != undefined && this.cookieService.get('user_details') != null && this.cookieService.get('user_details') != '') {
      this.user_details = JSON.parse(this.cookieService.get('user_details'));
      // if ( this.cookieService.get('favorite_car') != undefined && this.cookieService.get('favorite_car') != null && JSON.parse(this.cookieService.get('favorite_car')) != null && JSON.parse(this.cookieService.get('favorite_car')) != '') {
      //   this.search = JSON.parse(this.cookieService.get('favorite_car'));    
      // }
      // if ( this.cookieService.get('rsvp_car') != undefined && this.cookieService.get('rsvp_car') != null && JSON.parse(this.cookieService.get('rsvp_car')) != null && JSON.parse(this.cookieService.get('rsvp_car')) != '') {
      //   this.search = JSON.parse(this.cookieService.get('rsvp_car'));    
      // }
      this.user_id = this.user_details._id;
      // console.log(this.user_id);


      if (this.user_details.type == "salesrep") {
        let data: any = {
          endpoint: 'datalist',
          source: 'user',
          condition: {
            "salesrep": this.user_id
          }
        }
        this.apiService.getDatalist(data).subscribe((res: any) => {
          this.customerList = res.res;
          // console.log(this.customerList);
        });

      }
    }

    this.inventory_url=(this.cookieService.get('inventory_url'));
    this.inventory_auto_complete_url=(this.cookieService.get('inventory_auto_complete_url'));

    // console.log( this.inventory_auto_complete_url);


  }





  //*********** Coming Soon ************//
  comingSoonDialogBloghome(): void {
    const dialogRef = this.dialog.open(comingSoonDialogBloghome, {

      data: { name: this.name }
    });

    setTimeout(() => {
      this.dialog.closeAll();
    }, 4000);
  }
  //*********** Coming Soon ************//

  ngOnInit() {
    this.activatedRoute.data.forEach((data: any) => {
      this.blogList = data.home_data.result.blog_list;
      this.TestimonialListArray = data.home_data.result.testmonial_list;
      this.saveCarDataList = data.home_data.result.car_listing;
      this.sepecialCarList = data.home_data.result.car_special;
    })



    //for preown car
    // this.getData;

    // let data: any = {
    //   source:'allcar_view', 

    // }
    // this.apiService.getDatalistWithToken(data,'datalistwithouttoken').subscribe((resc:any)=>{
    //   this.saveCarDataList=resc.res;
    // })

    this.generateForm();
    this.getStateList();
    this.generatePreownForm();


    //for year list
    let datay: any;

    datay = {
      source: "manage-year"
    }
    this.apiService.getDatalistWithToken(datay, 'datalistwithouttoken').subscribe((resy) => {
      let result: any = resy;
      this.year_list = result.res
      // console.log('>>>>>',this.year_list)
    })


    // if(this.router.url == '/'){

      let data={
        source:'search_api_key'
      }
      this.http.post(this.serverUrlDemo + "datalistwithouttoken",data).subscribe((res:any)=>{
        // console.log(res);
        if (res.res[0]!=null && res.res[0]!=undefined && res.res[0]!='' && res.res[0].apikey!=null) {
          
        this.inventory_url = environment["inventory_url"] + res.res[0].apikey;
        this.inventory_auto_complete_url = environment["inventory__auto_completeurl"] + res.res[0].apikey
        // console.log(this.inventory_url);
  
        this.invalidApi=res.res[0].apikey;

        this.cookieService.set('inventory_url',this.inventory_url)
        this.cookieService.set('inventory_auto_complete_url',this.inventory_auto_complete_url)

  
      }
  
      });

    // } 


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

  //generate form for preown car

  generatePreownForm() {
    this.inventoryPreownForm = this.fb.group({
      make: [''],
      model: [''],
      year: [''],
      type: ['']
    })
  }

  //for preown car
  inventoryPreownSearch() {

    this.apploader.loader = 1;

    // console.log('hit')
    let yearVal = this.inventoryPreownForm.value.year;
    let typeVal = this.inventoryPreownForm.value.type;
    let makeVal = this.inventoryPreownForm.value.make;
    let modelVal = this.inventoryPreownForm.value.model;


    // let data: any = {
    //   source:'save_favorite_view',
    //   condition:{
    //   	"build.make":makeVal || modelVal || typeVal || yearVal
    //   }
    // }

    // this.apiService.getDatalistWithToken(data,'datalistwithouttoken').subscribe((resc:any)=>{
    //   this.saveCarDataList=resc.res
    //   this.apploader.loader = 0;

    // })
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

    if (this.type != '' || this.year != '' || this.make != '' || this.model != '') {

      let search_link = this.inventory_url + this.type + this.year + this.make + this.model + '&rows=50';

      this.http.get(search_link).subscribe((res: any) => {
        this.apploader.loader = 0;

        this.saveCarDataList = res.listings;
        // console.log('search list',this.search)
        console.log(this.saveCarDataList);

      },
        error => {

          // console.log('Invalid_Api')
          // console.log(this.apiService.invalidApi)


          this.apikey = this.apiService.invalidApi;

          let data: any;
          data = {

            "apikey": this.apikey
          }

          this.apiService.getDatalistWithToken(data, 'deleteapi').subscribe((res) => {
            // console.log("error")
          })
        }
      )
    }




  }







  //for basic inventory search

  inventoryCustomerSearch() {
    this.apploader.loader = 1;

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

        let search_link = this.inventory_url + this.type + this.year + this.make + this.vin + this.trim + this.vehicle + this.state + this.zip + this.model + '&rows=50';

        this.http.get(search_link).subscribe((res: any) => {
          this.apploader.loader = 0;

          this.search = res.listings;
          // console.log('search list',this.search)
          console.log(this.search);

        })
      }
      else {
        this.apploader.loader = 0;

        this.errorMsg = "Please select at least one field";

        const dialogRef = this.dialog.open(errorSearchModal, {
          width: '250px',
          data: { errorMsg: this.errorMsg }
        });

      }

    }

  }




  searchAutoComplete(event: any, field: string) {
    // this.apploader.loader = 1;


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
        // this.apploader.loader = 0;


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

      }, error => {
        // console.log('Invalid_Api')
        // console.log(this.apiService.invalidApi)


        this.apikey = this.apiService.invalidApi;

        let data: any;
        data = {

          "apikey": this.apikey
        }

        this.apiService.getDatalistWithToken(data, 'deleteapi').subscribe((res) => {
          // console.log("error")
        })
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
    console.log(val)
    // this.blogtitle=val.blogtitle.replace(' ', '-')
    // console.log(this.blogtitle)
    this.title=val.blogtitle
    this.blogtitle=this.title.replace(/[' '`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,'-');
    this.router.navigateByUrl('/blogs/'+ this.blogtitle+'/' +val._id);
  }
  showMoreFunc() {
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

  gotologin() {
    this.router.navigateByUrl('/login' + this.router.url)
    // console.log('/login'+this.router.url)
  }

  loginbefore() {
    this.loginMsg = "To access the ProbidAuto Search Results";

    const dialogRef = this.dialog.open(loginDialog, {
      width: '450px',
      data: { loginMsg: this.loginMsg }
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed', result);
      if (result == 'yes') {
        this.gotologin();
      }
      // this.loginMsg = result;
    });


  }

  favorite(item: any) {
    // console.log('this is favorite ')
    if (this.user_id == '') {
      this.cookieService.set('favorite_car', JSON.stringify(item));
      setTimeout(() => {
        this.loginbefore();
      }, 500);
    }
    else {
      // console.log(this.cookieService.get('favorite_car'))
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
        (res.status == "success")
      });
    }

  }

  loadMoreSearchResult() {
    this.indexval = this.indexval + 5;
  }

  showimg(i: any, j: any) {
    // console.log('+++',i, j)
    this.indexCount = i;
    this.indexCountForImg = j;
  }



  rsvpSend(item: any) {
    // console.log(this.user_id)
    if (this.user_id == '') {
      this.cookieService.set('rsvp_car', JSON.stringify(item));
      setTimeout(() => {
        this.loginbefore();
      }, 500);
    }
    else {
      // console.log('rsvpSend',item);
      // console.log(this.cookieService.get('rsvp_car'));
      let endpoint: any = "addorupdatedata";
      item.added_by = this.user_id;
      item.status = 0;
      if (this.user_details.type == 'salesrep') {
        item.added_for = this.customur_id;
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
        (res.status == "success")
      });
    }
  }

/** sharing over facebook **/
  fb_share(val: any) {
    console.log(val._id);
    window.open('https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdev.probidauto.com%2Fblogdetail%2F&amp;src=sdkpreparse' + val._id, '','');
  }

  
  // share(url: string) {
  //   var fullUrl = 'https://dev.probidauto.com/customer-signup/'+url+'/'+this.userCookies._id;
  //   this.cookieService.set('shareIngUrl',fullUrl);
  //   let params: UIParams = {
  //     href: fullUrl,
  //     method: 'share',
  //     quote: 'https://dev.probidauto.com/'
  //   };
  //   this.facebook.ui(params)
  //     .then((res: UIResponse) =>{
  //     })
  //     .catch();   
  // }


  //*********** Coming Soon ************//
  comingSoonDialogTestimonhome(): void {
    const dialogRef = this.dialog.open(comingSoonDialogTestimonhome, {

      data: { name: this.name }
    });

    setTimeout(() => {
      this.dialog.closeAll();
    }, 4000);
  }
  //*********** Coming Soon ************//

}

//login  modal
@Component({
  selector: 'logindialog',
  templateUrl: 'logindialog.html',
})
export class loginDialog {
  constructor(
    public dialogRef: MatDialogRef<loginDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    // console.log(data);
  }


  LinkToLogin(): void {
    this.dialogRef.close();
  }

}

//error modal

@Component({
  selector: 'errorSearchModal',
  templateUrl: 'errorSearchModal.html',
})
export class errorSearchModal {
  constructor(
    public dialogRef: MatDialogRef<errorSearchModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    // console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}



@Component({
  templateUrl: '../../../layout/coming-soon.html'
})
export class comingSoonDialogBloghome {

  constructor(
    public dialogRef: MatDialogRef<comingSoonDialogBloghome>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


@Component({
  selector: 'app-coming-soon',
  templateUrl: '../../../layout/coming-soon.html'
})
export class comingSoonDialogTestimonhome {

  constructor(
    public dialogRef: MatDialogRef<comingSoonDialogTestimonhome>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}




// $(document).on('click', '.owl-item>div', function(){
//   var $speed = 300;
//   owl.trigger('to.owl.carousel', [$(this).data( 'position' ), $speed] );
// })




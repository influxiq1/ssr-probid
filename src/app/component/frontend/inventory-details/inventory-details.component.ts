import { Component, OnInit,Inject } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { ApiService } from '../../../api.service';
// import { BasicInventorySearchBackendComponent } from '../inventory/basic-inventory-search-backend/basic-inventory-search-backend.component';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import {DetailServiceService} from '../../../detail-service.service'
import { MetaService } from '@ngx-meta/core';

export interface DialogData {
  errorMsg: string;
  loginMsg: string;
  
}


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

  public data: any;
  public indexImg: any;
  public message: any = "Are you sure you want to delete this?";
  public indexVal: any = 4;
  public makeName: any;
  public user_details: any;
  public user_id: any;
  public customur_id: any;
  public errorMsg: any = 'Please Choose customer';
  public carData: any;
  public searchRecord:any;
  public loginMsg: string ='';
  


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

  }



  //show details
  showImage(item: any, i: any) {
    this.indexImg = i
  }

  addCar(val:any){
    console.log(val)

    this.router.navigateByUrl('/login' + this.router.url)

  }

  gotologin(){
    this.router.navigateByUrl('/login'+this.router.url)
  }


  loginbefore(){
    this.loginMsg = "To access the ProbidAuto Search Results";

        const dialogRef = this.dialog.open(loginInventoryDialog, {
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
    console.log(item)
    // console.log('this is favorite ')
    // if (this.user_id  == '') {
    //   this.cookieService.set('favorite_car', JSON.stringify(item));
      setTimeout(() => {
        this.loginbefore();
      }, 500);
    // }
    // else{
      // console.log(this.cookieService.get('favorite_car'))
      // let endpoint: any = "addorupdatedata";
      // item.added_by = this.user_id;
      // let card_data:any = {
      //   card_data: item
      // }
      // let data: any = {
      //   data: card_data,
      //   source: "save_favorite",
      // };
      // // console.log(data)
      //   this.apiService.CustomRequest(data, endpoint).subscribe((res:any) => {
      //     // console.log(res);
      //     (res.status == "success")
      //   });
    // }
   
  }

  rsvpSend(item: any) {
    console.log(item)

    // console.log(this.user_id)
    // if (this.user_id  == '') {
    //   this.cookieService.set('rsvp_car', JSON.stringify(item));
      setTimeout(() => {
        this.loginbefore();
      }, 500);
    // }
    // else {
    // console.log('rsvpSend',item);
    // console.log(this.cookieService.get('rsvp_car'));
    // let endpoint: any = "addorupdatedata";
    // item.added_by = this.user_id;
    // item.status = 0;
    // if (this.user_details.type == 'salesrep') {
    //   item.added_for = this.customur_id;
    //   } else {
    //     item.added_for = this.user_id;
    //   }
    // let card_data:any = {
    //   card_data: item
    // }
    // let data: any = {
    //   data: card_data,
    //   source: "send_for_rsvp",
    // };
    // // console.log(data)
    //   this.apiService.CustomRequest(data, endpoint).subscribe((res:any) => {
    //     // console.log(res);
    //     (res.status == "success")
    //   });
    // }
  }

  


}



@Component({
  selector: 'loginInventory',
  templateUrl: 'loginInventory.html',
})
export class loginInventoryDialog {
  constructor(
    public dialogRef: MatDialogRef<loginInventoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    // console.log(data);
  }
  

  LinkToLogin(): void {
    this.dialogRef.close();
  }

}


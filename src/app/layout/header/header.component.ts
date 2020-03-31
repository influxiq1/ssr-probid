import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';


export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 /* public showHidediv: any;
*/
  /*@Output() public sidenavToggle = new EventEmitter();*/

  public  name: string;
  navbarOpen = false;
  public user_details:any=[];

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  public user_detail: any ='';
public user_full_name: any = '';
public userCookies:any=[]
  constructor(public router: Router, public cookieService: CookieService, public dialog: MatDialog, public activeroute: ActivatedRoute, public translate: TranslateService) {  

    if (this.cookieService.get('user_details') != null) {
    this.user_detail =this.cookieService.get('user_details');
    // this.userCookies=JSON.parse(this.user_detail);
    // console.log(' this.userCookies>>', this.userCookies)
    }
   }
   
  ngOnInit() {
    
  }

  logOut() {
    this.cookieService.deleteAll('/');
      setTimeout(()=>{
          this.router.navigate(['/']);
      },500);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(comingSoonDialog, {
     
      data: {name: this.name}
    });

    setTimeout(() => {
      this.dialog.closeAll();
    }, 4000);
  }

 /* public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }*/



  openGMDialog(): void {
    const dialogRef = this.dialog.open(googlemapDialog, {
      data: {name: this.name},
      height: 'auto',
      width: '100%',
      maxWidth:'90vw',
      panelClass: 'googleMapDialogCls'
    });
  }



}


@Component({
  // selector: 'coming',
  templateUrl: '../../layout/coming-soon.html',
  // template: `
  // <div class="logomodalwrapper">
  // <div class="logomodal"><img src="https://dev.probidauto.com/assets/images/logo.png"></div>
  // <h2>coming soon</h2></div>
  // `
})
export class comingSoonDialog {

  constructor(
    public dialogRef: MatDialogRef<comingSoonDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}




@Component({
  selector: 'googlemap',
  templateUrl: '../googlemapDialog.html'
})
export class googlemapDialog {

  constructor(
    public dialogRef: MatDialogRef<googlemapDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
import { Component, OnInit,Inject} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute ,Router} from '@angular/router';
import { ApiService } from '../../../api.service';
// import { MatDialog } from '@angular/material';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { UIParams, UIResponse, FacebookService } from 'ngx-facebook';
import { FormBuilder } from '@angular/forms';

export interface DialogData {
  data: any;
  msg:any;
} 

@Component({
  selector: 'app-repdashboard',
  templateUrl: './repdashboard.component.html',
  styleUrls: ['./repdashboard.component.css']
})
export class RepdashboardComponent implements OnInit {
  public userCookies: any;
  public userid: any = '';

  public datalist: any = '';
  public saveSearchIndex:any=5;
  public message:any="Are you sure you want to delete this?";
  public rsvpList:any;
  public saveSearchList:any;

  
  public indexval:any=6;
  public indexValForLinkdin: any = 6;
  public errorApiKey:any;
  
  public allFacebookBanner : any = [
    'facebookbanner-img1.jpg', 'facebookbanner-img2.jpg', 'facebookbanner-img3.jpg', 'facebookbanner-img4.jpg', 'facebookbanner-img5.jpg', 'facebookbanner-img6.jpg', 'facebookbanner-img7.jpg', 'facebookbanner-img8.jpg', 'facebookbanner-img9.jpg', 'facebookbanner-img10.jpg', 'facebookbanner-img11.jpg', 'facebookbanner-img12.jpg', 'facebookbanner-img13.jpg', 'facebookbanner-img14.jpg', 'facebookbanner-img15.jpg', 'facebookbanner-img16.jpg', 'facebookbanner-img17.jpg', 'facebookbanner-img18.jpg', 'facebookbanner-img19.jpg', 'facebookbanner-img20.jpg', 'facebookbanner-img21.jpg', 'facebookbanner-img22.jpg', 'facebookbanner-img23.jpg', 'facebookbanner-img24.jpg', 'facebookbanner-img25.jpg', 'facebookbanner-img26.jpg', 'facebookbanner-img27.jpg', 'facebookbanner-img28.jpg', 'facebookbanner-img29.jpg', 'facebookbanner-img30.jpg', 'facebookbanner-img31.jpg', 'facebookbanner-img32.jpg', 'facebookbanner-img33.jpg', 'facebookbanner-img34.jpg', 'facebookbanner-img35.jpg', 'facebookbanner-img36.jpg'];
public allLinkdinBanner : any = [
      'linkedinbanner-img1.jpg', 'linkedinbanner-img2.jpg', 'linkedinbanner-img3.jpg', 'linkedinbanner-img4.jpg', 'linkedinbanner-img5.jpg', 'linkedinbanner-img6.jpg', 'linkedinbanner-img7.jpg', 'linkedinbanner-img8.jpg', 'linkedinbanner-img9.jpg', 'linkedinbanner-img10.jpg', 'linkedinbanner-img11.jpg', 'linkedinbanner-img12.jpg', 'linkedinbanner-img13.jpg', 'linkedinbanner-img14.jpg', 'linkedinbanner-img15.jpg', 'linkedinbanner-img16.jpg', 'linkedinbanner-img17.jpg', 'linkedinbanner-img18.jpg', 'linkedinbanner-img19.jpg', 'linkedinbanner-img20.jpg', 'linkedinbanner-img21.jpg', 'linkedinbanner-img22.jpg', 'linkedinbanner-img23.jpg', 'linkedinbanner-img24.jpg', 'linkedinbanner-img25.jpg', 'linkedinbanner-img26.jpg', 'linkedinbanner-img27.jpg', 'linkedinbanner-img28.jpg', 'linkedinbanner-img29.jpg', 'linkedinbanner-img30.jpg', 'linkedinbanner-img31.jpg', 'linkedinbanner-img32.jpg', 'linkedinbanner-img33.jpg', 'linkedinbanner-img34.jpg', 'linkedinbanner-img35.jpg', 'linkedinbanner-img36.jpg', 'linkedinbanner-img37.jpg', 'linkedinbanner-img38.jpg', 'linkedinbanner-img39.jpg', 'linkedinbanner-img40.jpg', 'linkedinbanner-img41.jpg', 'linkedinbanner-img42.jpg'];






  
  constructor(public cookieService: CookieService, public activatedRoute: ActivatedRoute, public apiService: ApiService, public dialog: MatDialog,public snack:MatSnackBar,public router:Router, private fb1: FacebookService, public fb:FormBuilder) {
    if (this.cookieService.get('user_details') != undefined && this.cookieService.get('user_details') != null && this.cookieService.get('user_details') != '') {
      this.userCookies = JSON.parse(this.cookieService.get('user_details'));
      this.userid = this.userCookies._id; 
      }
      fb1.init({
        appId: '2540470256228526',
        version: 'v2.9'
      });
   }

   
   /* To copy Text from Textbox */
  // copyInputMessage(inputElement){
  //   inputElement.select();
  //   document.execCommand('copy');
  //   inputElement.setSelectionRange(0, 0);
  // }
  copyMessage(val: string){
    let url = this.apiService.share_link+'customer-signup/'+val+'/'+this.userCookies._id;
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = url;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.snack.open('Url Copied on clipboard','ok',{
      duration:2000
    })

  }

  logoutWithFacebook(): void {
    this.fb1.logout().then();
  }

  linkdinShare(url: any){
    var fullUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=https://dev.probidauto.com/customer-signup/'+url+'/'+this.userCookies._id;
    // console.log(fullUrl)

  }

  ngOnInit() {
    this.activatedRoute.data.forEach((data:any) => {
      // console.log('dash-data',data)

      this.datalist = data.rsvp.result;

      this.rsvpList=data.rsvp.result.rsvp_list

      this.saveSearchList=data.rsvp.result.save_search 
    })
  }



  
  
  share(url: string) {
    var fullUrl = 'https://dev.probidauto.com/customer-signup/'+url+'/'+this.userCookies._id;
    this.cookieService.set('shareIngUrl',fullUrl);
    // console.log(fullUrl)
 
    let params: UIParams = {
      href: fullUrl,
      method: 'share',
      quote: 'https://dev.probidauto.com/'
    };
   
    this.fb1.ui(params)
      .then((res: UIResponse) =>{

      })
      .catch();
   
  }

  /* To copy Text from Textbox */
  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  deleteAny(a: any,b: any,c: any){

  }

  deleteRsvp(item: any,index:any){
    // console.log('this is favorite ',item,index);
    const dialogRef = this.dialog.open(RemoveDialogComponent, {
      width: '250px',
      data:this.message

    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result)
      
        if(result=='yes'){
    let data: any = {
      id:item._id,
      source: 'send_for_rsvp'
    }
    this.apiService.deleteSingleData1(data).subscribe((res: any)=>{
      // console.log(res);
      if (res.status == 'success') {
        this.rsvpList.splice(index,index+1);
        this.snack.open('Record Removed Successfully..!','Ok',{duration:2000})
        
      }
    })
  }
})


  }

  deleteSaveSearch(item: any,index:any){
    // console.log('this is favorite ',item,index);

    const dialogRef = this.dialog.open(RemoveDialogComponent, {
      width: '250px',
      data:this.message

    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result)
      
        if(result=='yes'){
    let data: any = {
      id:item._id,
      source: 'save_favorite'
    }
    this.apiService.deleteSingleData1(data).subscribe((res: any)=>{
      // console.log(res);
      if (res.status == 'success') {
        this.saveSearchList.splice(index,index+1);
        this.snack.open('Record Removed Successfully..!','Ok',{duration:2000})
        
      }
    })
  }
})

  }

  //for save search details
  viewSaveDetails(val:any){
    console.log(val)
    this.router.navigateByUrl('/inventory-detail/'+val);
  }

  //for rsvp details
  viewRsvpDetails(val:any){
    this.router.navigateByUrl('/rsvp-detail/'+val);
  }


}



//modal component for delete RSVP & 


@Component({
  selector:'app-removeDialog',
  templateUrl:'./removeDialog.html'
})
export class RemoveDialogComponent {
  constructor( public dialogRef: MatDialogRef<RemoveDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData){

  }
}


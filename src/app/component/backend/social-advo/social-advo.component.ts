import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookService, LoginResponse, UIParams, UIResponse } from 'ngx-facebook';
import { CookieService } from 'ngx-cookie-service';
import { MetaService } from '@ngx-meta/core';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-social-advo',
  templateUrl: './social-advo.component.html',
  styleUrls: ['./social-advo.component.css']
})
export class SocialAdvoComponent implements OnInit {
  public userCookies: any;
  public userid: any = '';
  public profile: any = '';
  public allImg : any = [
    'facebookbanner-img1.jpg'
  ]
  constructor(public router: Router, private readonly meta: MetaService, private fb: FacebookService, public cookieService: CookieService, public apiService: ApiService) {

    this.meta.setTitle('ProBid Auto - Social Advo');
    this.meta.setTag('og:description', 'ProBid Auto offers the easiest and the most convenient way for car buyers to get their desired cars, listing Used Cars for Sale from multiple dealerships and major Auction houses around the USA.');
    this.meta.setTag('twitter:description', 'ProBid Auto offers the easiest and the most convenient way for car buyers to get their desired cars, listing Used Cars for Sale from multiple dealerships and major Auction houses around the USA.');
    this.meta.setTag('og:keyword', 'ProBid Auto, Used Cars for Sale in USA, Buy Used Cars USA, Used Car Dealership the USA');
    this.meta.setTag('twitter:keyword', 'ProBid Auto, Used Cars for Sale in USA, Buy Used Cars USA, Used Car Dealership the USA');
    this.meta.setTag('og:title', 'ProBid Auto - Social Advo');
    this.meta.setTag('twitter:title', 'ProBid Auto - Social Advo');
    this.meta.setTag('og:url', 'https://dev.probidauto.com');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', 'https://dev.probidauto.com/assets/images/logomain.png');
    this.meta.setTag('twitter:image', 'https://dev.probidauto.com/assets/images/logomain.png');


    this.userCookies = JSON.parse(this.cookieService.get('user_details'));
    
    fb.init({
      appId: '2540470256228526',
      version: 'v2.9'
    });
   }

    /* To copy Text from Textbox */
  copyInputMessage(inputElement){
    console.log(inputElement.select())
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }



  ngOnInit() {
    this.getLoginStatus();
  }


  login() {
    this.fb.login()
      .then((res: LoginResponse) => {
       
        this.getProfile();
      })
      .catch();
  }
  
    getLoginStatus() {
    this.fb.getLoginStatus()
      .then((res: any)=>{
       
        this.getProfile();
      })
      .catch();
  }

  getProfile() {
    this.fb.api('me/?fields=id,name,email,picture')
      .then((res: any) => {
       
        this.profile = res;
        
      })
      .catch((error: any) => {

      });
  }
    /**
   * Get the users friends
   */
  // getFriends() {
  //   this.fb.api('/me/friends')
  //     .then((res: any) => {
  //       console.log('Got the users friends', res);
  //     })
  //     .catch(this.handleError);
  // }
  
  logoutWithFacebook(): void {

    this.fb.logout().then();
  }
  linkdinShare(url: any){
    var fullUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=https://dev.probidauto.com/customer-signup/'+url+'/'+this.userCookies._id;
    // console.log(fullUrl)

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
   
    this.fb.ui(params)
      .then((res: UIResponse) =>{

      })
      .catch();
   
  }


  private handleError(error) {
    console.error('Error processing action', error);
  }
}

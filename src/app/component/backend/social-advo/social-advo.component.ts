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
  public allFacebookBanner : any = [
    'facebookbanner-img1.jpg', 'facebookbanner-img2.jpg', 'facebookbanner-img3.jpg', 'facebookbanner-img4.jpg', 'facebookbanner-img5.jpg', 'facebookbanner-img6.jpg', 'facebookbanner-img7.jpg', 'facebookbanner-img8.jpg', 'facebookbanner-img9.jpg', 'facebookbanner-img10.jpg', 'facebookbanner-img11.jpg', 'facebookbanner-img12.jpg', 'facebookbanner-img13.jpg', 'facebookbanner-img14.jpg', 'facebookbanner-img15.jpg', 'facebookbanner-img16.jpg', 'facebookbanner-img17.jpg', 'facebookbanner-img18.jpg', 'facebookbanner-img19.jpg', 'facebookbanner-img20.jpg', 'facebookbanner-img21.jpg', 'facebookbanner-img22.jpg', 'facebookbanner-img23.jpg', 'facebookbanner-img24.jpg', 'facebookbanner-img25.jpg', 'facebookbanner-img26.jpg', 'facebookbanner-img27.jpg', 'facebookbanner-img28.jpg', 'facebookbanner-img29.jpg', 'facebookbanner-img30.jpg', 'facebookbanner-img31.jpg', 'facebookbanner-img32.jpg', 'facebookbanner-img33.jpg', 'facebookbanner-img34.jpg', 'facebookbanner-img35.jpg', 'facebookbanner-img36.jpg'];
    public allLinkdinBanner : any = [
      'linkedinbanner-img1.jpg', 'linkedinbanner-img2.jpg', 'linkedinbanner-img3.jpg', 'linkedinbanner-img4.jpg', 'linkedinbanner-img5.jpg', 'linkedinbanner-img6.jpg', 'linkedinbanner-img7.jpg', 'linkedinbanner-img8.jpg', 'linkedinbanner-img9.jpg', 'linkedinbanner-img10.jpg', 'linkedinbanner-img11.jpg', 'linkedinbanner-img12.jpg', 'linkedinbanner-img13.jpg', 'linkedinbanner-img14.jpg', 'linkedinbanner-img15.jpg', 'linkedinbanner-img16.jpg', 'linkedinbanner-img17.jpg', 'linkedinbanner-img18.jpg', 'linkedinbanner-img19.jpg', 'linkedinbanner-img20.jpg', 'linkedinbanner-img21.jpg', 'linkedinbanner-img22.jpg', 'linkedinbanner-img23.jpg', 'linkedinbanner-img24.jpg', 'linkedinbanner-img25.jpg', 'linkedinbanner-img26.jpg', 'linkedinbanner-img27.jpg', 'linkedinbanner-img28.jpg', 'linkedinbanner-img29.jpg', 'linkedinbanner-img30.jpg', 'linkedinbanner-img31.jpg', 'linkedinbanner-img32.jpg', 'linkedinbanner-img33.jpg', 'linkedinbanner-img34.jpg', 'linkedinbanner-img35.jpg', 'linkedinbanner-img36.jpg', 'linkedinbanner-img37.jpg', 'linkedinbanner-img38.jpg', 'linkedinbanner-img39.jpg', 'linkedinbanner-img40.jpg', 'linkedinbanner-img41.jpg', 'linkedinbanner-img42.jpg'];
  public indexval:any=6;
  public indexValForLinkdin: any = 6;
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
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }
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
  }



  ngOnInit() {
    this.getLoginStatus();
  }
  loadMoreSearch(val:string){
    if (val=='facebook') {
    this.indexval=this.indexval+6;
    } else {
      this.indexValForLinkdin = this.indexValForLinkdin+6
    }
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

import { Component, OnInit } from '@angular/core';
import { MetaService } from '@ngx-meta/core';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  public logo: any = '../../assets/images/logo.png';
  public loginRouteingUrl: any = { 
    "path":"",
    "buttonName":"Login",
    "customLink":"/login",
    "customURl":""
  };
  public signUpRouteingUrl: any = { 
    "path":"",
    // "buttonName":"Sign-Up",
    "customLink":"/sign-up",
    "customURl":""
  };
  public buttonName: any = 'Forgot Password';
  // public signUpRouteingUrl: any = 'sign-up';
  public formTitle: any = 'Forgot Password ?';
  public serverUrl:any = this.apiService.serverUrlDemo;
  public addEndpoint: any = {
    endpoint:'forgetpassword'
  };
  public domainUrl: any = 'https://dev.probidauto.com/reset-password';
  constructor(private readonly meta: MetaService, public apiService: ApiService) {
    
    // this.meta.setTitle('Forget Password dynamic');
    // this.meta.setTag('og:description', 'This is dynamic decription ');
    // this.meta.setTag('og:title', 'This is dynamic title with meta og ');
    // this.meta.setTag('og:type', 'website');
    // this.meta.setTag('og:image', 'https://upload.wikimedia.org/wikipedia/commons/f/f8/superraton.jpg');

    this.meta.setTitle('ProBid Auto - Forget Password');
    this.meta.setTag('og:description', ' Forget Password');
    this.meta.setTag('twitter:description', ' Forget Password');
    this.meta.setTag('og:keyword', 'Forget Password');
    this.meta.setTag('twitter:keyword', 'Forget Password');
    this.meta.setTag('og:title', 'ProBid Auto - Forget Password');
    this.meta.setTag('twitter:title', 'ProBid Auto - Forget Password');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', 'https://dev.probidauto.com/assets/images/logomain.png');
    this.meta.setTag('twitter:image', 'https://dev.probidauto.com/assets/images/logomain.png');

 }

  ngOnInit() {
  }
  

}

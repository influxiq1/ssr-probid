import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../api.service';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-api-manager',
  templateUrl: './api-manager.component.html',
  styleUrls: ['./api-manager.component.css']
})
export class ApiManagerComponent implements OnInit {

  public apiKeyList:any=[]; 
  public currentUrl:any;

  displayedColumns:string[] = ['Key Id', 'Api Key', 'Key Number','action'];

  constructor(public activatedRoute:ActivatedRoute,public apiService:ApiService,public cookieService:CookieService, public router: Router) {

    const body = document.getElementsByTagName('body')[0];
    this.currentUrl = this.router.url;
    if (this.currentUrl == '/api-manager') {
      body.classList.add('apimanager')
    } else{
      body.classList.remove('apimanager')
    }

   }

  ngOnInit() {

    this.activatedRoute.data.forEach(res=>{
      let result:any
      result=res
      this.apiKeyList=result.apiKey.res;
      console.log('>>>>',this.apiKeyList)

    })


  }

  editRoute(){

  }

}
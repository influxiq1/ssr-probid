import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  public savedUrl: any = [];
  public savedId: any = [];
  public blogList: any;
  public indexval:any = 3;


  public ConfigData: any = [
    { type: 'facebook', link: 'https://SoureshBanerjee.com' },
    { type: 'twitter', link: 'https://google.com' },
    { type: 'linkedin', link: 'https://jasonwatmore.com' },
    { type: 'tumbler', link:'material.angular.io' }
  ];
public tokenVal: any;

  constructor(public router:Router, public apiService: ApiService) {

    
  }



  blogdetail(val:any){
    // console.log(val)
    this.router.navigateByUrl('/blogdetail/' +val)
  }
  
  showMoreFunc(){
    this.indexval = this.indexval + 3;   
    // console.log(this.indexval);
  }

  ngOnInit() {

      // console.log(this.tokenVal.length)

    var data: any = {};
    
    data = {
      source:"blogs_view"
    }
    this.apiService.getDatalistWithToken(data, "getblogdata").subscribe((res:any)=>{

      this.blogList = res.items;
      // console.log(this.blogList)

    });
  }



}
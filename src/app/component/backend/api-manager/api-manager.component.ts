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
  public tableName:'search_api_key';
  public apiUrl: any = this.apiService.serverUrlDemo;
  public apiKeyList_skip:any;
  public apiKeyList_modify_header:any;
  public status:any;
  public UpdateEndpoint:any;
  public deleteendpoint:any;
  public detail_skip_array:any;
  public editroute:any;
  public searchendpoint:'datalist';
  public modify_header_array:any;

  statusarray: any = [{val: 1, name: 'Active'}, {val: 0, name: 'Pending'}, {val: 2, name: 'Inactive'}]; 
  

//   // this is use for  All type of search 
//   search_settings:any={

//     datesearch:[{startdatelabel:"Start Date",enddatelabel:"End Date",submit:"Search By Date",  field:"created_at"}],   // this is use for  date search 

//     textsearch:[{label:"Search By email",field:'email'},{label:"Search By Full name",field:'name'}],  // this is use for  text search

//     search:[{label:"Search By autocomplete",field:'name'}]     // this is use for  Autocomplete search
// }


  

  constructor(public activatedRoute:ActivatedRoute,public apiService:ApiService,public cookieService:CookieService) { }

  ngOnInit() {

    this.activatedRoute.data.forEach(res=>{
      let result:any
      result=res
      this.apiKeyList=result.apiKey.res;
      console.log('>>>>',this.apiKeyList)

    })


  }

}

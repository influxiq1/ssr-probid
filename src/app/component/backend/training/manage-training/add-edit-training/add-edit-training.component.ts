import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../../../../api.service';
import { MetaService } from '@ngx-meta/core';
@Component({
  selector: 'app-add-edit-training',
  templateUrl: './add-edit-training.component.html',
  styleUrls: ['./add-edit-training.component.css']
})
export class AddEditTrainingComponent implements OnInit {
  public userCookies:any;
  title = 'demoApp';
  public formdataval: any;
  public recid: any;
  public header_text:any="Add Training"
  public listingPageRoute : any="/manage-training/list";
  public serverDetails: any = {
    // "serverUrl": "https://9ozbyvv5v0.execute-api.us-east-1.amazonaws.com/production/api/",
    // "jwttoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1ODAyMDE1MzcsImlhdCI6MTU4MDExNTEzN30.EfP5ru45maD0LM9NDkGy7xgUUslVcV3ls-k8-Bid9qU"
    "serverUrl": this.ApiService.serverUrlDemo,
    "jwttoken": this.cookieService.get('jwtToken')
  };
  public formSource: any = {
    "source":'training_category_management',
    "endpoint": "addorupdatedata",
    "showEndpoint":"datalist",
    "AddheaderText": "Add Training",
    "EditheaderText": "Edit Training",
    "formTitleName": 'Training'
  }
  public additionalData: any = {
    "objectId": "parent_catagory"
  };
  constructor(private route : ActivatedRoute, public activatedRoute: ActivatedRoute, public ApiService: ApiService, private cookieService: CookieService,private readonly meta: MetaService) {
    this.meta.setTitle('ProBid Auto - Manage Training');
        this.meta.setTag('og:title', 'ProBid Auto - Manage Training');
        this.meta.setTag('twitter:title', 'ProBid Auto - Manage Training');
        this.meta.setTag('og:type', 'website');
        this.meta.setTag('og:image', '../../assets/images/logomain.png');
        this.meta.setTag('twitter:image', '../../assets/images/logomain.png');

        if (this.cookieService.get('jwtToken') != undefined  && this.cookieService.get('user_details') != null && this.cookieService.get('jwtToken') != null && this.cookieService.get('jwtToken') != '') {
          this.userCookies = JSON.parse(this.cookieService.get('user_details'));
          // console.log('>>>>>>>',this.userCookies)
          }
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.header_text="Edit Training"
      this.recid = params['id'];
      console.log(params['id'])
      if (this.recid !=null && this.recid !='' && this.recid !=undefined) {
        // this.geteditdata()
      }
  });

    this.formdataval = [
      { inputtype: 'text', name: 'catagory_name', label: 'Training Title', placeholder: 'Enter Training Title', validationrule: { required: true }, validationerrormsg: 'is required' },

      { inputtype: 'textarea', name: 'description', label: 'Description', placeholder: 'Enter Description'},

      { inputtype: 'text', name: 'priority', label: 'Priority', placeholder: 'Enter Priority', validationrule: { required: true }, validationerrormsg: 'is required' }, 
      {inputtype:'radio',name:'type',value:["User","Salesrep","All"],valuelabel:'',label:"Training accessible to",placeholder:"",validationrule:{required:true},validationerrormsg:'', class:'radioclass'},

      // { inputtype: 'text', name: 'catagoryname', label: 'Catagory Name ', placeholder: 'Enter Catagory Name', validationrule: { required: true }, validationerrormsg: 'is required' },

      {inputtype:'select',name:'parent_catagory',label:'Parent Category',defaultchoice:'Select a Parent Category',sourceview:'training_category_management',endpoint:'datalist',selectvalue:'catagory_name',selectid:'_id'},
      
      // {inputtype:'select',name:'state',label:'State/Region',defaultchoice:'Select a State/region',sourceview:'assets/states.json',multiple:true, sourcetype:'static',selectvalue:'name',selectid:'abbreviation',validationrule:{required:true},validationerrormsg:'is required'},
        { inputtype: 'checkbox', name: 'status', label: 'Active', placeholder: 'Enter Status', validationrule: { required: true }, validationerrormsg: 'is required' },
    ];


  }

}

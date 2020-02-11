import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../../../../api.service';
import { MetaService } from '@ngx-meta/core';

@Component({
  selector: 'app-add-edit-lessions',
  templateUrl: './add-edit-lessions.component.html',
  styleUrls: ['./add-edit-lessions.component.css']
})
export class AddEditLessionsComponent implements OnInit {
  title = 'demoApp';
  public userCookies: any;
  public formdataval: any;
  public recid: any;
  public listingPageRoute : any="/manage-lesson/list";
  public pageName : any="Manage Lesson";

  public serverDetails: any = {
    // "serverUrl": "https://9ozbyvv5v0.execute-api.us-east-1.amazonaws.com/production/api/",
    // "jwttoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1ODAyMDE1MzcsImlhdCI6MTU4MDExNTEzN30.EfP5ru45maD0LM9NDkGy7xgUUslVcV3ls-k8-Bid9qU"
    "serverUrl": this.ApiService.serverUrlDemo,
    "jwttoken": this.cookieService.get('jwtToken')
  };
  public formSource: any = {
    "source": 'manage_lession',
    "endpoint": "addorupdatedata",
    "showEndpoint": "datalist",
    "AddheaderText": "Add Lesson",
    "EditheaderText": "Edit Lesson"
  }
  public additionalData: any = {
    "objectId": "associated_training",
    "objectId2": "prerequisite_lession"
  };
  public configFileUpload:any={
    baseUrl: "https://fileupload.influxhostserver.com/",
    endpoint: "uploads",
    size: "51200", // kb
    format:["jpg", "jpeg", "png", "bmp", "zip", 'html','mp4'],  // use all small font
    type: "imageGallery-picture",
    path: "imageGallery",
    prefix: "imageGallery-picture_",
    formSubmit: false,
    conversionNeeded: 0,
    bucketName: "probidfiles-dev.com"
  }
  
  constructor(public route: ActivatedRoute, public activatedRoute: ActivatedRoute, public ApiService: ApiService, private cookieService: CookieService,private readonly meta: MetaService) {
    this.meta.setTitle('ProBid Auto - Manage Lessions');
        this.meta.setTag('og:title', 'ProBid Auto - Manage Lessions');
        this.meta.setTag('twitter:title', 'ProBid Auto - Manage Lessons');
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
      this.recid = params['id'];
      console.log(params['id'])
      if (this.recid != null && this.recid != '' && this.recid != undefined) {
        // this.geteditdata()
      }
    });

    this.formdataval = [
      { inputtype: 'text', name: 'lession_title', label: 'Title', placeholder: 'Enter Lession Title', validationrule: { required: true }, validationerrormsg: 'is required' },

      { inputtype: 'textarea', name: 'description', label: 'Description', placeholder: 'Enter Description' },

      { inputtype: 'radio', name: 'test_associate_training', value: ["Yes", "No"], valuelabel: '', label: "Is there a test associated with training ", placeholder: "", validationrule: { required: true }, validationerrormsg: '', class: 'radioclass' },


      { inputtype: 'select', name: 'associated_training', label: 'Associated Training', defaultchoice: 'Select a Training', sourceview: 'training_category_management', endpoint: 'datalist', selectvalue: 'catagory_name', selectid: '_id' },

      { inputtype: 'select', name: 'prerequisite_lession', label: 'Prerequisite Lesson', defaultchoice: 'Select a Prerequisite Lession', sourceview: 'manage_lession', endpoint: 'datalist', selectvalue: 'lession_title', selectid: '_id' },

      { inputtype: 'checkbox', name: 'status', label: 'Active', placeholder: 'Enter Status', validationrule: { required: true }, validationerrormsg: 'is required' },
      { inputtype: 'select', name: 'mediaType', label: 'Training Type', defaultchoice: 'Select a Training Type', sourceview: './assets/data/mediaType.json', sourcetype:'static', selectvalue: 'name', selectid: 'selectname' ,validationrule:{required:true},validationerrormsg:'is required'},

    ];


  }

}

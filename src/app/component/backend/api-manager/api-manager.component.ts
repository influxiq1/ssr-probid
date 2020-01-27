import { Component, OnInit ,Inject} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../api.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MetaService } from '@ngx-meta/core';

export interface DialogData {
  data: any;
}

@Component({
  selector: 'app-api-manager',
  templateUrl: './api-manager.component.html',
  styleUrls: ['./api-manager.component.css']
})
export class ApiManagerComponent implements OnInit {

  public apiKeyList:any=[]; 
  public currentUrl:any;

  displayedColumns:string[] = ['Key Id', 'Api Key', 'Key Number','action'];

  constructor(private readonly meta: MetaService, public activatedRoute:ActivatedRoute,public apiService:ApiService,public cookieService:CookieService, public router: Router,public dialog:MatDialog) {

    this.meta.setTitle('ProBid Auto - Manage API');
    this.meta.setTag('og:title', 'ProBid Auto - Manage API');
    this.meta.setTag('twitter:title', 'ProBid Auto - Manage API');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', '../../assets/images/logomain.png');
    this.meta.setTag('twitter:image', '../../assets/images/logomain.png');

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

  editApiData(val:any){
    console.log(val)
    const dialogRef = this.dialog.open(ApiModalComponent, {
      data: ''

    });



  }

}



//modal for api update 

@Component({
  selector: 'app-apiModal',
  templateUrl: './apiModal.html'
})
export class ApiModalComponent {

  public apikeyForm:FormGroup;

  constructor(public dialogRef: MatDialogRef<ApiModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,public fb:FormBuilder) {

      this.apikeyForm=this.fb.group({
        apikey:[''],
        keynum:['']

      })




  }
}






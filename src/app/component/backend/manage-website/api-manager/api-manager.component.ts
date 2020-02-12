import { Component, OnInit ,Inject} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../../../api.service';
import { CookieService } from 'ngx-cookie-service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MetaService } from '@ngx-meta/core';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  public apiKeyData:any;
  public user_details:any;

  displayedColumns:string[] = ['Key Id', 'Api Key', 'Key Number','Status','action'];

  constructor(private readonly meta: MetaService, public activatedRoute:ActivatedRoute,public apiService:ApiService,public cookieService:CookieService, public router: Router,public dialog:MatDialog) {

    this.meta.setTitle('ProBid Auto - Manage API');
    this.meta.setTag('og:title', 'ProBid Auto - Manage API');
    this.meta.setTag('twitter:title', 'ProBid Auto - Manage API');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', '../../assets/images/logomain.png');
    this.meta.setTag('twitter:image', '../../assets/images/logomain.png');


    if (this.cookieService.get('user_details') != undefined && this.cookieService.get('user_details') != null && this.cookieService.get('user_details') != '') {
      this.user_details = JSON.parse(this.cookieService.get('user_details'));
    
     // console.log(this.user_id);
      // console.log('type>>', this.user_details.type)
    
    }



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
      // console.log('>>>>',this.apiKeyList)

    })

  }

  editApiData(val:any){
    // console.log(val)

    var data = { "source": "search_api_key", "condition": {"_id": val}}
        this.apiService.CustomRequest(data, 'datalist').subscribe((res: any) => {
          // console.log('data',res)
          this.apiKeyData=res;
          // console.log('data',this.apiKeyData)
          const dialogRef = this.dialog.open(ApiModalComponent, {
            width: '250px',
            data: {data:this.apiKeyData}

          });
          
        })
  }

}


//modal for api update 

@Component({
  selector: 'app-apiModal',
  templateUrl: './apiModal.html'
})
export class ApiModalComponent {

  public apikeyForm:FormGroup;
  public errorApiKey:any;
  public apiKeyList:any=[]; 



  constructor(public dialogRef: MatDialogRef<ApiModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,public fb:FormBuilder,public apiService:ApiService,public snack:MatSnackBar ) {
      // console.log("modal data",data.data.res[0])
      this.generateForm();

      this.apikeyForm.patchValue({
        apikey:data.data.res[0].apikey,
        keynum:data.data.res[0].no
      })
  }

  generateForm(){

    this.apikeyForm=this.fb.group({
      apikey:['',Validators.required],
      keynum:['',Validators.required]

    })
  }


//for new apikey submit
apiKeySubmit(){
  for (let x in this.apikeyForm.controls) {
    this.apikeyForm.controls[x].markAsTouched();
  }
  // console.log(this.apikeyForm.value.apikey.length)
  if(this.apikeyForm.valid){
    this.errorApiKey=''
    if( this.apikeyForm.value.apikey.length ==32)
   {

// console.log('hit')
    let data:any;
    
      data={
        no:this.apikeyForm.value.keynum,
        apikey:this.apikeyForm.value.apikey
      } 
      // console.log(data)
  

    this.apiService.CustomRequest(data,'apiupdate').subscribe((res)=>{
      let result:any;
      result=res

      if(result.status == 'success'){
        this.dialogRef.close();

        this.snack.open('Api Key Updated','ok',{
          duration:2000
        })
        
      }
    })
  }
   else {
    this.errorApiKey='api key is not valid'
  }

  }
 
}


}






import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { MetaService } from '@ngx-meta/core';


export interface DialogData {
  
}
@Component({
  selector: 'app-admin-manage-categories',
  templateUrl: './admin-manage-categories.component.html',
  styleUrls: ['./admin-manage-categories.component.css']
})
export class AdminManageCategoriesComponent implements OnInit {

  public user_details:any;
  public manage_type: any = [];
  public manage_make: any = [];
  public manage_model: any = [];
  public manage_year: any = [];


  public manage_type_skip: any = ['_id','created_at','Status','updated_at','id','categoriesType'];
  public manage_type_modify_header: any = {'added_on':'Name','TypeName': 'Type Name', 'status':'Status'};

  public manage_make_skip: any = ['_id','created_at','Status','updated_at','id','categoriesType'];
  public manage_make_modify_header: any = {'Added_on':'Name','make_name': 'Make Name', 'status':'Status'};

  public manage_model_skip: any = ['_id','created_at','Status','updated_at','id','categoriesType'];
  public manage_model_modify_header: any = {};

  public manage_year_skip: any = ['_id','created_at','Status','updated_at','id','categoriesType'];
  public manage_year_modify_header: any = {};

  public tableNameForType: any = 'manage-type';
  public tableNameforMake: any = 'manage-make';
  public tableNameForModel: any = 'manage-model';
  public tableNameForYear: any = 'manage-year';
  public updateurl: any = 'addorupdatedata';
  public deleteurl: any = 'deletesingledata';
  public custombutton: any = '';
  public statusarray: any = [{val: '1', name: 'Active'}, {val: '0', name: 'Inactive'}, {val: '2', name: 'Pending'}];
  public editroutetype:any = 'edittype';
  public editroutemake:any = 'editmake';
  public editroutemodel:any = 'editmodel';

  public editrouteyear:any = 'edityear';


  constructor(public router: Router, public apiService: ApiService, public activatedRoute: ActivatedRoute, public dialog: MatDialog, public cookieService: CookieService,private readonly meta: MetaService) { 
    this.meta.setTitle('ProBid Auto - Add edit manage Category');
    this.meta.setTag('og:title', 'ProBid Auto - Add edit manage Category');
    this.meta.setTag('twitter:title', 'ProBid Auto - Add edit manage Category');
    this.meta.setTag('og:type', 'website');
    this.meta.setTag('og:image', '../../assets/images/logomain.png');
    this.meta.setTag('twitter:image', '../../assets/images/logomain.png');

    if (this.cookieService.get('user_details') != undefined && this.cookieService.get('user_details') != null && this.cookieService.get('user_details') != '') {
      this.user_details = JSON.parse(this.cookieService.get('user_details'));
      // console.log(this.userCookies);
      }

  }


  ngOnInit() {
    this.activatedRoute.data.forEach(data=>{
      let result:any;
      result=data;
      // console.log('result.res');
      // console.log(result.serviceList.res);
      if (this.router.url ==='/manage-type') {
        this.meta.setTitle('ProBid Auto - Manage Type');
        this.meta.setTag('og:type', 'website');
        this.meta.setTag('og:image', '../../assets/images/logomain.png');
        this.meta.setTag('twitter:image', '../../assets/images/logomain.png');
        this.manage_type = result.serviceList.res;
        // console.log('type>>>>',this.manage_type)
      } else if(this.router.url ==='/manage-make') {
        this.meta.setTitle('ProBid Auto - Manage Make');
        this.meta.setTag('og:type', 'website');
        this.meta.setTag('og:image', '../../assets/images/logomain.png');
        this.meta.setTag('twitter:image', '../../assets/images/logomain.png');
        this.manage_make = result.serviceList.res;
        // console.log('manage_make');
        // console.log('make>>>>',this.manage_make)

      } else if(this.router.url ==='/manage-model') {
        this.meta.setTitle('ProBid Auto - Manage Model');
        this.meta.setTag('og:type', 'website');
        this.meta.setTag('og:image', '../../assets/images/logomain.png');
        this.meta.setTag('twitter:image', '../../assets/images/logomain.png');
        this.manage_model = result.serviceList.res;
        // console.log('model>>>>',this.manage_model)

      } else if (this.router.url ==='/manage-year'){
        this.meta.setTitle('ProBid Auto - Manage Year');
        this.meta.setTag('og:type', 'website');
        this.meta.setTag('og:image', '../../assets/images/logomain.png');
        this.meta.setTag('twitter:image', '../../assets/images/logomain.png');
        this.manage_year = result.serviceList.res;
        // console.log('year>>>>',this.manage_year)

      }
      // this.admin_datalist = result.results.res;
      
    })
  }

  modalopen() {
    const dialogRef = this.dialog.open(DialogModalOpenDialog);

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }


  addType(): void {
    // console.log('Type');
   
  }

  addMake() {
   
  }
  addModel() {
    // console.log('Model')
  }
  addYear() {
    // console.log('year')
  }

}


@Component({
  selector: 'admin-add-categories',
  template: `<app-admin-add-categories></app-admin-add-categories>`,
})
export class DialogModalOpenDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogModalOpenDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}




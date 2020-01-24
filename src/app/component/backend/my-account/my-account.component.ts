import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../../api.service';
import { AppComponent } from '../../../app.component';
import { MetaService } from '@ngx-meta/core';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  @ViewChild(FormGroupDirective, { static: false }) formDirective: FormGroupDirective;

  // isPasswordVisible: Boolean = false;

  isPasswordVisible: Boolean = true;

  public index: number;
  public user_cookies: any;
  public UpdateForm: FormGroup;
  public changePasswordFormGroup: FormGroup;
  public cookies_id: any;
  public userData: any = [];
  public profilePicture: any;
  
  public images_array: any = [];
  public states: any;
  public cities: any;
  public allCities: any;
  public configData: any = {
    baseUrl: "https://fileupload.influxhostserver.com/",
    endpoint: "uploads",
    size: "51200", // kb
    format: ["jpg", "jpeg", "png", "bmp", "zip", 'html'],  // use all small font
    type: "profile-picture",
    path: "profilePicture",
    prefix: "profile-picture",
    formSubmit: false,
    conversionNeeded: 0,
    bucketName: "probidfiles-dev.com"
  }
  constructor(public fb: FormBuilder,
    public apiService: ApiService, public cook: CookieService, public apploader: AppComponent,private readonly meta: MetaService,public snackBar :MatSnackBar
  ) {
    this.allStateCityData();

    this.meta.setTitle('ProBid Auto - My Account');
        this.meta.setTag('og:title', 'ProBid Auto - My Account');
        this.meta.setTag('twitter:title', 'ProBid Auto - My Account');
        this.meta.setTag('og:type', 'website');
        this.meta.setTag('og:image', '../../assets/images/logomain.png');
        this.meta.setTag('twitter:image', '../../assets/images/logomain.png');

    let allcookies: any;
    allcookies = cook.getAll();
    this.user_cookies = JSON.parse(allcookies.user_details);
    this.cookies_id = this.user_cookies._id;


    this.UpdateForm = this.fb.group({
      id: [null, null],
      email: [null, Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      phone: [null, Validators.required],
      address: [null, Validators.required],
      zip: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      profile_picture: ['', []],

    });
    this.changePasswordFormGroup = this.fb.group({
      oldPassword: [null, Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: []
    }, { validator: this.matchpassword('newPassword', 'confirmPassword') ,
         validator1:this.misMatchPassword('oldPassword','newPassword')})
  }


  // togglePasswordText() {
  //   this.isPasswordVisible = !this.isPasswordVisible;
  // }


  ngOnInit() {
    this.getdata();

  }
  inputUntouched(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }

  matchpassword(passwordkye: string, confirmpasswordkye: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordkye],
        confirmpasswordInput = group.controls[confirmpasswordkye];
      if (passwordInput.value !== confirmpasswordInput.value) {
        return confirmpasswordInput.setErrors({ notEquivalent: true });
      } else {
        return confirmpasswordInput.setErrors(null);
      }
    };
  }
  misMatchPassword(oldPassword: string, newPassword: string) {
   
    return (group: FormGroup) => {
      let oldPasswordInput = group.controls[oldPassword],
      newPasswordInput = group.controls[newPassword];
      if (oldPasswordInput.value === newPasswordInput.value) {
        return newPasswordInput.setErrors({ notEquivalent: true });
      } else {
        return oldPasswordInput.setErrors(null);
      }
    };
  }


  changePasswordFormSubmit() {
    for (let x in this.changePasswordFormGroup.controls) {
      this.changePasswordFormGroup.controls[x].markAsTouched();
    }
    if (this.changePasswordFormGroup.valid) {
      delete this.changePasswordFormGroup.value.confirmPassword;
      let endpoint: any = "changepassword";
      let data = {
        _id: this.cookies_id,
        adminflag: 0,
        oldPassword: this.changePasswordFormGroup.value.oldPassword,
        newPassword: this.changePasswordFormGroup.value.newPassword
      }
      this.apploader.loader = 1;

      this.apiService.CustomRequest(data, endpoint).subscribe(res => {
        let message = "Successfully Changed Password";
        let action  = "Ok"
        this.snackBar.open(message, action, {
          duration: 1000,
        });
        this.apploader.loader = 0;

      })
    }
  }                                               
  getdata() {
    let data: any = {
      endpoint: 'datalist',
      source: 'user_view',
      condition: {
        "_id_object": this.cookies_id
      }
    }
    this.apiService.getDatalist(data).subscribe((res: any) => {
      this.userData = res.res[0];
      console.log("editabla data",this.userData);
      // setTimeout(() => {
      //   this.getCityByName(this.userData.state);
      // }, 400);
      this.UpdateForm.controls['firstname'].patchValue(this.userData.firstname);
      this.UpdateForm.controls['lastname'].patchValue(this.userData.lastname);
      this.UpdateForm.controls['email'].patchValue(this.userData.email);
      this.UpdateForm.controls['phone'].patchValue(this.userData.phone);
      this.UpdateForm.controls['address'].patchValue(this.userData.address);
      this.UpdateForm.controls['zip'].patchValue(this.userData.zip);
      this.UpdateForm.controls['city'].patchValue(this.userData.city);
      this.UpdateForm.controls['state'].patchValue(this.userData.state);
    });
  }
  /**for getting all states & cities function start here**/
  allStateCityData() {
    this.apiService.getSiteSettingData("./assets/data/states.json").subscribe(response => {
      this.states = response;
    });

    this.apiService.getSiteSettingData("./assets/data/city.json").subscribe(response => {
      this.cities = response;
    });
  }
  /**for getting all states & cities  function end here**/
  getCity(event) {
    var val = event;
    this.allCities = this.cities[val];
  }

  getCityByName(stateName) {
    this.cities = this.cities[stateName];
  }

  UpdateFormSubmit() {
    for (let x in this.UpdateForm.controls) {
      this.UpdateForm.controls[x].markAsTouched();
    }
    if (this.configData.files.length > 0 ) {
      for (const loop in this.configData.files ) {
        this.images_array =
          this.images_array.concat({
            "upload_server_id": this.configData.files[loop].upload.data._id,
            "basepath": this.configData.files[loop].upload.data.basepath + '/' + this.configData.path + '/',
            "fileservername": this.configData.files[loop].upload.data.data.fileservername,
            "name": this.configData.files[loop].name,
            "type": this.configData.files[loop].type,
            "bucketname": this.configData.bucketName
          });
      }

      this.UpdateForm.controls['profile_picture'].patchValue(this.images_array);
    } else {
      this.UpdateForm.value.profile_picture = false;
    }
    if (this.UpdateForm.valid) {
      let endpoint: any = "addorupdatedata";
      let data: any = {
        source: "user",
        data: {
          id: this.cookies_id,
          firstname: this.UpdateForm.value.firstname,
          lastname: this.UpdateForm.value.lastname,
          email: this.UpdateForm.value.email,
          phone: this.UpdateForm.value.phone,
          address: this.UpdateForm.value.address,
          zip: this.UpdateForm.value.zip,
          city: this.UpdateForm.value.city,
          state: this.UpdateForm.value.state,
          profile_picture: this.UpdateForm.value.profile_picture
        }
      };
      this.apploader.loader = 1;

      this.apiService.CustomRequest(data, endpoint).subscribe(res => {
        let message = "Successfully Updted";
        let action  = "Ok"
        this.snackBar.open(message, action, {
          duration: 1000,
        });
        console.log(res);
        this.apploader.loader = 0;

      })
    }

  }
}

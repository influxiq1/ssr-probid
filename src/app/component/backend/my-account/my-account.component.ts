import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../../../api.service';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  @ViewChild(FormGroupDirective,{static: false}) formDirective: FormGroupDirective;

  // isPasswordVisible: Boolean = false;

  isPasswordVisible: Boolean = true;

  public index: number;
  public user_cookies: any;
  public UpdateForm: FormGroup;
  public changePasswordFormGroup: FormGroup;
  public cookies_id: any;
  public userData: any = [];
  public profilePicture:any;
  public state_usss: any = [
    {
      "name": "Alabama",
      "abbreviation": "AL"
    },
    {
      "name": "Alaska",
      "abbreviation": "AK"
    },
    {
      "name": "American Samoa",
      "abbreviation": "AS"
    },
    {
      "name": "Arizona",
      "abbreviation": "AZ"
    },
    {
      "name": "Arkansas",
      "abbreviation": "AR"
    },
    {
      "name": "California",
      "abbreviation": "CA"
    },
    {
      "name": "Colorado",
      "abbreviation": "CO"
    },
    {
      "name": "Connecticut",
      "abbreviation": "CT"
    },
    {
      "name": "Delaware",
      "abbreviation": "DE"
    },
    {
      "name": "District Of Columbia",
      "abbreviation": "DC"
    },
    {
      "name": "Federated States Of Micronesia",
      "abbreviation": "FM"
    },
    {
      "name": "Florida",
      "abbreviation": "FL"
    },
    {
      "name": "Georgia",
      "abbreviation": "GA"
    },
    {
      "name": "Guam",
      "abbreviation": "GU"
    },
    {
      "name": "Hawaii",
      "abbreviation": "HI"
    },
    {
      "name": "Idaho",
      "abbreviation": "ID"
    },
    {
      "name": "Illinois",
      "abbreviation": "IL"
    },
    {
      "name": "Indiana",
      "abbreviation": "IN"
    },
    {
      "name": "Iowa",
      "abbreviation": "IA"
    },
    {
      "name": "Kansas",
      "abbreviation": "KS"
    },
    {
      "name": "Kentucky",
      "abbreviation": "KY"
    },
    {
      "name": "Louisiana",
      "abbreviation": "LA"
    },
    {
      "name": "Maine",
      "abbreviation": "ME"
    },
    {
      "name": "Marshall Islands",
      "abbreviation": "MH"
    },
    {
      "name": "Maryland",
      "abbreviation": "MD"
    },
    {
      "name": "Massachusetts",
      "abbreviation": "MA"
    },
    {
      "name": "Michigan",
      "abbreviation": "MI"
    },
    {
      "name": "Minnesota",
      "abbreviation": "MN"
    },
    {
      "name": "Mississippi",
      "abbreviation": "MS"
    },
    {
      "name": "Missouri",
      "abbreviation": "MO"
    },
    {
      "name": "Montana",
      "abbreviation": "MT"
    },
    {
      "name": "Nebraska",
      "abbreviation": "NE"
    },
    {
      "name": "Nevada",
      "abbreviation": "NV"
    },
    {
      "name": "New Hampshire",
      "abbreviation": "NH"
    },
    {
      "name": "New Jersey",
      "abbreviation": "NJ"
    },
    {
      "name": "New Mexico",
      "abbreviation": "NM"
    },
    {
      "name": "New York",
      "abbreviation": "NY"
    },
    {
      "name": "North Carolina",
      "abbreviation": "NC"
    },
    {
      "name": "North Dakota",
      "abbreviation": "ND"
    },
    {
      "name": "Northern Mariana Islands",
      "abbreviation": "MP"
    },
    {
      "name": "Ohio",
      "abbreviation": "OH"
    },
    {
      "name": "Oklahoma",
      "abbreviation": "OK"
    },
    {
      "name": "Oregon",
      "abbreviation": "OR"
    },
    {
      "name": "Palau",
      "abbreviation": "PW"
    },
    {
      "name": "Pennsylvania",
      "abbreviation": "PA"
    },
    {
      "name": "Puerto Rico",
      "abbreviation": "PR"
    },
    {
      "name": "Rhode Island",
      "abbreviation": "RI"
    },
    {
      "name": "South Carolina",
      "abbreviation": "SC"
    },
    {
      "name": "South Dakota",
      "abbreviation": "SD"
    },
    {
      "name": "Tennessee",
      "abbreviation": "TN"
    },
    {
      "name": "Texas",
      "abbreviation": "TX"
    },
    {
      "name": "Utah",
      "abbreviation": "UT"
    },
    {
      "name": "Vermont",
      "abbreviation": "VT"
    },
    {
      "name": "Virgin Islands",
      "abbreviation": "VI"
    },
    {
      "name": "Virginia",
      "abbreviation": "VA"
    },
    {
      "name": "Washington",
      "abbreviation": "WA"
    },
    {
      "name": "West Virginia",
      "abbreviation": "WV"
    },
    {
      "name": "Wisconsin",
      "abbreviation": "WI"
    },
    {
      "name": "Wyoming",
      "abbreviation": "WY"
    }
  ];
 public images_array:any=[];
  public configData: any = {
    baseUrl: "https://fileupload.influxhostserver.com/",
    endpoint: "uploads",
    size: "51200", // kb
    format:["jpg", "jpeg", "png", "bmp", "zip", 'html'],  // use all small font
    type: "profile-picture",
    path: "profilePicture",
    prefix: "profile-picture",
    formSubmit: false,
    conversionNeeded: 0,
    bucketName: "probidfiles-dev.com"
  }
  constructor(public fb: FormBuilder,
    public apiService: ApiService, public cook: CookieService,public apploader: AppComponent,
    ) {
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
      profile_picture:['', []],

    });
    this.changePasswordFormGroup = this.fb.group({
      oldPassword: [null, Validators.required],
      newPassword: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(6)]],
      confirmPassword: []
    }, { validator: this.matchpassword('newPassword', 'confirmPassword') })
  }


  togglePasswordText(){
    this.isPasswordVisible = !this.isPasswordVisible;
  }


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
  changePasswordFormSubmit() {
    let x: any;
    for (x in this.changePasswordFormGroup.controls) {
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
        console.log(res);
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

  UpdateFormSubmit() {

    for ( let x in this.UpdateForm.controls) {
      this.UpdateForm.controls[x].markAsTouched();
    }
    if (this.configData.files.length > 0) {
      for (const loop in this.configData.files) {
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
          profile_picture:this.UpdateForm.value.profile_picture
        }
      };
      this.apploader.loader = 1;

      this.apiService.CustomRequest(data, endpoint).subscribe(res => {
        console.log(res);
        this.apploader.loader = 0;
     
      })
    }

  }
}

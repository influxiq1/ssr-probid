import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-miscellaneous',
  templateUrl: './miscellaneous.component.html',
  styleUrls: ['./miscellaneous.component.css']
})
export class MiscellaneousComponent implements OnInit {

  public contactUsData: any;
  public user_cookie: any;
  contactUsData_skip: any = ["_id", "created_at"];
  detail_skip_array: any = ["_id"]
  contactUsData_modify_header: any = {
    "locationname": "Location Name"
  };
  tableName: any = 'contactusForm';
  UpdateEndpoint: any = "addorupdatedata";
  deleteEndpoint: any = "deletesingledata";
  

  // status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  view: any = "contactusForm";

  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(resolveData => {
      this.contactUsData = resolveData.data.res;
    });
  }


}

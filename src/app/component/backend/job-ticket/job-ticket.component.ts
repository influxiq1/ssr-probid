import { Component, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from "@angular/material";
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-ticket',
  templateUrl: './job-ticket.component.html',
  styleUrls: ['./job-ticket.component.css']
})
export class JobTicketComponent implements OnInit {

  constructor(
    public router: Router) { }

  ngOnInit() {
    
  }
  deleteRsvp(val: any, item: any){

  }

   

}

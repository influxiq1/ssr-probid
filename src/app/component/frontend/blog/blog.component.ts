import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {


  constructor(public router:Router, public apiService: ApiService) {

    
  }


  ngOnInit() {

 
  }



}
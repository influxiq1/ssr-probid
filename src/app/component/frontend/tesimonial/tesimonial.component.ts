import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-tesimonial',
  templateUrl: './tesimonial.component.html',
  styleUrls: ['./tesimonial.component.css']
})
export class TesimonialComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public apiService: ApiService) { 

    this.router.navigateByUrl('/home');
  }


  ngOnInit() {
  }




}

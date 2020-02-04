import { Component, OnInit } from '@angular/core';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-route-loader',
  templateUrl: './route-loader.component.html',
  styleUrls: ['./route-loader.component.css']
})
export class RouteLoaderComponent implements OnInit {
  constructor(public router: Router) {
    /* Universal Loader for Reslove */
  
}

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

@Component({
  selector: 'app-route-loader',
  templateUrl: './route-loader.component.html',
  styleUrls: ['./route-loader.component.css']
})
export class RouteLoaderComponent implements OnInit {
 public loading: boolean = false;
  constructor(public router: Router) {
    /* Universal Loader for Reslove */
  this.router.events.subscribe((event: Event) => {
    switch (true) {
      case event instanceof NavigationStart: {
        this.loading = true;
        break;
      }
​
      case event instanceof NavigationEnd:
      case event instanceof NavigationCancel:
      case event instanceof NavigationError: {
        this.loading = false;
        break;
      }
      default: {
        break;
      }
    }
  });
   }

  ngOnInit() {
  }

}

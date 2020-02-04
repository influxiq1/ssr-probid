import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import {
//   Event,
//   NavigationCancel,
//   NavigationEnd,
//   NavigationError,
//   NavigationStart
// } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // public loading: boolean = false;
  title = 'probid-angular';
  public loader = 0;
  constructor(public router: Router){
    /* Universal Loader for Reslove */
//   this.router.events.subscribe((event: Event) => {
//     switch (true) {
//       case event instanceof NavigationStart: {
//         this.loading = true;
//         break;
//       }
// ​
//       case event instanceof NavigationEnd:
//       case event instanceof NavigationCancel:
//       case event instanceof NavigationError: {
//         this.loading = false;
//         break;
//       }
//       default: {
//         break;
//       }
//     }
//   });

   }
}
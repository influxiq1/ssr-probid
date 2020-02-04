import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import {
//   Event,
//   NavigationCancel,
//   NavigationEnd,
//   NavigationError,
//   NavigationStart,
//   Router
// } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'probid-angular';
  public loader = 0;
  // public loading: boolean = false;
  constructor(public router: Router){
    
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
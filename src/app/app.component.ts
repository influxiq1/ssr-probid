import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'probid-angular';
  public loader = 0;
  public loading = 0;
  constructor(public router: Router){
    

   }
}
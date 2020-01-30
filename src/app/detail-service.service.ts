import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailServiceService {
  public dataSource = new BehaviorSubject({carData:''});
  currentData = this.dataSource.asObservable();

  constructor() { }

  carData(data: any) {
    // console.log('>>>',data)
    this.dataSource.next(data);
  }
}

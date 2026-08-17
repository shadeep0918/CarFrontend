import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Menu {
  constructor() {}
  public isOpend = new BehaviorSubject<boolean>(false);
  public opened: boolean = false;


  public toggle() {
    this.opened = !this.opened;
    this.isOpend.next(this.opened);
  }
}

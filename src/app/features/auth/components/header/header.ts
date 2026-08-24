import { Component } from '@angular/core';
 import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Menu } from '../service/menu';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatToolbar, MatIcon, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  constructor(private menu : Menu) {
  }

  toggleMenu(){
  this.menu.toggle();
  }
}

import { Component } from '@angular/core';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { Menu } from '../service/menu';
import { MatList, MatListItem } from '@angular/material/list';
import { RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import {Footer} from '../footer/footer';

@Component({
  selector: 'toggle-content',
  imports: [
    MatDrawerContainer,
    MatDrawerContent,
    MatDrawer,
    MatListItem,
    RouterLink,
    MatList,
    MatIcon,
    RouterOutlet,
    RouterLinkActive,
    Footer,
  ],
  templateUrl: './content.html',
  styleUrl: './content.scss',
})
export class Content {
  opened = true;
  constructor(private menu: Menu) {
    this.menu.isOpend.subscribe((data) => {
      this.opened = data;
    });
  }
}

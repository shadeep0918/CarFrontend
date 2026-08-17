import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './features/auth/components/header/header';
import { Content } from './features/auth/components/content/content';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header,Content],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('courseUI');

  name: string = 'Isuru'; //the properties of the Appcompenent is able to use within the  app.html file that is called interpolation  that using {{}}
}

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './componont/header/header';
import { Content } from './componont/content/content';

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

import { Component } from '@angular/core';
import { CarCard} from '../../../shared/components/car-card/car-card';

@Component({
  selector: 'app-home',
  imports: [CarCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}

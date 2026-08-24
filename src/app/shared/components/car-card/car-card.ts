import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-car-card',
  standalone: true,
  templateUrl: './car-card.html',
  styleUrl: './car-card.scss',
})
export class CarCard {
  @Input() brand: string = 'MERCEDES';
  @Input() name: string = 'Mercedes-Benz C-Class';

}

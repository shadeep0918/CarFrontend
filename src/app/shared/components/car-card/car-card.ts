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
  @Input() pricePerDay : number = 120;
  @Input() imageUrl : string = '';
  @Input() isNew : boolean = false;

}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// 1. Interface for Fuel Option Cards
export interface FuelTypeOption {
  number: string;
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  routeKey?: string;
}

@Component({
  selector: 'app-fuel-type',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fuel-type.html',
  styleUrls: ['./fuel-type.scss'],
})

export class FuelTypeComponent {
  // Page Hero Data
  hero = {
    tag: 'FUEL TYPE',
    titleMain: 'Choose Your',
    titleAccent: 'Power.',
    description:
      'Select the fuel technology that matches your driving style.',
  };

  // Fuel Cards Data Array
  fuelOptions: FuelTypeOption[] = [
    {
      number: '01',
      icon: '⛽',
      title: 'Petrol',
      description:
        'Petrol vehicles provide powerful performance and a traditional driving experience.',
      buttonText: 'Explore Petrol Cars →',
      routeKey: 'petrol',
    },
    {
      number: '02',
      icon: '⚡',
      title: 'Electric',
      description:
        'Electric vehicles offer instant acceleration, quiet driving and zero tailpipe emissions.',
      buttonText: 'Explore Electric Cars →',
      routeKey: 'electric',
    },
    {
      number: '03',
      icon: '♻',
      title: 'Hybrid',
      description:
        'Hybrid vehicles combine an electric motor with a traditional engine.',
      buttonText: 'Explore Hybrid Cars →',
      routeKey: 'hybrid',
    },
    {
      number: '04',
      icon: '🔋',
      title: 'Plug-in Hybrid',
      description:
        'Charge your vehicle and enjoy the flexibility of hybrid technology.',
      buttonText: 'Explore Cars →',
      routeKey: 'plug-in-hybrid',
    },
  ];

  // Button Click Handler Action
  onSelectFuel(option: FuelTypeOption): void {
    console.log(`Selected Fuel Type: ${option.title}`);
    // Router navigation or filtering logic can be added here
  }
}

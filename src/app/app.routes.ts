import { Routes } from '@angular/router';
import { Component } from '@angular/core';
  import { HomeComponent } from './features/auth/components/car/car';
import { FuelTypeComponent } from './features/auth/components/fuel-type/fuel-type';
import { Specification } from './features/auth/components/specification/specification';
import { Reservation } from './features/auth/components/reservation/reservation';

// 1. We create a tiny, invisible component that just shows a black background
@Component({
  template: '<div style="background-color: #111111; height: 100vh; width: 100%;"></div>',
  standalone: true,
})
export class BlankComponent {}

export const routes: Routes = [
  {
    path: '',
    component: BlankComponent,
    pathMatch: 'full',
  },

  {
    path: 'cars',
    component: HomeComponent,
  },
  {
    path: 'fuelType',
    component: FuelTypeComponent,
  },
  {
    path: 'reservation',
    component: Reservation,
  },
  {
    path :'specification',
    component :Specification
  }
];

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation.html',
  styleUrl: './reservation.scss',
})
export class Reservation {
  
  // Basic method to handle form submission when you are ready to add functionality
  onSubmit(event: Event) {
    event.preventDefault();
    console.log('Reservation confirmed!');
    alert('Reservation Request Submitted!');
  }

}

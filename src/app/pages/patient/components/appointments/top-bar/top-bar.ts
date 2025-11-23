import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  standalone: false,
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css'
})
export class TopBar {

  constructor(
    private route: Router
  ) { }

  routeToAppointmentCreation(): void {
    this.route.navigate(['/measurements']);
  }

}

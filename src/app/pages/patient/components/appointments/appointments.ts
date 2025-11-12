import { Component } from '@angular/core';

@Component({
  selector: 'app-appointments',
  standalone: false,
  templateUrl: './appointments.html',
  styleUrl: './appointments.css'
})
export class Appointments {
 appointments = [
   {
     id: 1,
     date: '2021-03-01',
  },
   {
     id: 2,
     date: '2021-03-01',
   },
   {
     id: 3,
     date: '2021-03-01',
   },
   {
     id: 4,
     date: '2021-03-01',
   },
   {
     id: 5,
     date: '2021-03-01',
   }
 ];
}

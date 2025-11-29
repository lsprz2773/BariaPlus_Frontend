import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-stats',
  standalone: false,
  templateUrl: './stats.html',
  styleUrl: './stats.css'
})
export class Stats {
  @Input() patientId!: number;

  constructor(private router:Router) {
  }

  onViewStats(){
    this.router.navigate(['stats', this.patientId])
  }
}


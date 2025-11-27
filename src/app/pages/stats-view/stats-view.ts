import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {StatViewCardConfig} from './components/stats-button/stats-button';

@Component({
  selector: 'app-stats-view',
  standalone: false,
  templateUrl: './stats-view.html',
  styleUrl: './stats-view.css'
})
export class StatsView {
  constructor(private router:Router) { }

  selectedType: StatViewCardConfig['type'] = 'bmi';

  onBack(){
    this.router.navigate(['dashboard']);
  }

  onMenuTypeChange(type: StatViewCardConfig['type']) {
    this.selectedType = type;
  }
}

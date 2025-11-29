import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StatViewCardConfig} from './components/stats-button/stats-button';

@Component({
  selector: 'app-stats-view',
  standalone: false,
  templateUrl: './stats-view.html',
  styleUrl: './stats-view.css'
})
export class StatsView implements OnInit{
  constructor(private router:Router, private route:ActivatedRoute) { }

  selectedType: StatViewCardConfig['type'] = 'bmi';
  patientId!: number;

  ngOnInit() {
    this.patientId = +this.route.snapshot.paramMap.get('patientId')!;
    console.log('ID PARA STATS',this.patientId);
  }

  onBack(){
    this.router.navigate([`/patient/${this.patientId}`]);
  }

  onMenuTypeChange(type: StatViewCardConfig['type']) {
    this.selectedType = type;
    console.log('type',type);
  }
}

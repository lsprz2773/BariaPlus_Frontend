import { Component } from '@angular/core';
import {StatViewCardConfig} from '../stats-button/stats-button';

@Component({
  selector: 'app-stats-menu',
  standalone: false,
  templateUrl: './stats-menu.html',
  styleUrl: './stats-menu.css'
})
export class StatsMenu {
    selectedType:StatViewCardConfig['type'] = 'bmi';

    onTypeChange(type: StatViewCardConfig['type']) {
      this.selectedType = type;

      //aqui pondre la logica del cambio de botones para los cambios de grafica
    }
}

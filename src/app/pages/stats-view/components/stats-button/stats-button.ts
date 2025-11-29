import {Component, EventEmitter, HostBinding, Input, Output} from '@angular/core';

@Component({
  selector: 'app-stats-button',
  standalone: false,
  templateUrl: './stats-button.html',
  styleUrl: './stats-button.css'
})
export class StatsButton {
  @Input() config!: StatViewCardConfig;
  @Input() selected = false;

  @Output() clicked = new EventEmitter<StatViewCardConfig['type']>();

  @HostBinding('class.selected') get isSelectedClass(){
    return this.selected;
  }


  get cardInfo():CardInfo{
    const configs = {
      'bmi':{
        iconPath: 'assets/iconos/bmiStats.png',
        title: 'IMC'
      },
      'body-mass':{
        iconPath: 'assets/iconos/bodymassStats.png',
        title: 'Masa muscular'
      },
      'fat':{
        iconPath: 'assets/iconos/fatStats.png',
        title: 'Grasa'
      },
      'visceral-fat':{
        iconPath: 'assets/iconos/viscfatStats.png',
        title: 'Grasa visceral'
      },
      'whr':{
        iconPath: 'assets/iconos/whrStats.png',
        title: 'ICC'
      }
    } as const;
    return configs[this.config.type];
  }

  onClick(){
    this.clicked.emit(this.config.type);
  }

}

export interface StatViewCardConfig {
  type: 'bmi' | 'body-mass' | 'fat' | 'visceral-fat' | 'whr';
}

interface CardInfo {
  iconPath: string;
  title: string;
}


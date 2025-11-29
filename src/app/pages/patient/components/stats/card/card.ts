import {Component, Input} from '@angular/core';
import {StatViewCardConfig} from '../../../../stats-view/components/stats-button/stats-button';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {
  @Input() config!: StatViewCardConfig;
  @Input() existsConsultation!: boolean;

  get cardInfo():CardInfo {
    const configs = {
      'bmi':{
        iconPath: 'assets/iconos/bmi.png',
        title: 'IMC'
      },
      'body-mass':{
        iconPath: 'assets/iconos/bodymass.png',
        title: 'Masa muscular'
      },
      'fat':{
        iconPath: 'assets/iconos/fat.png',
        title: 'Grasa'
      },
      'visceral-fat':{
        iconPath: 'assets/iconos/viscfat.png',
        title: 'Grasa visceral'
      },
      'whr':{
        iconPath: 'assets/iconos/whr.png',
        title: 'ICC'
      }
    }
    return configs[this.config.type];
  }
}

interface CardInfo {
  iconPath: string;
  title: string;
}

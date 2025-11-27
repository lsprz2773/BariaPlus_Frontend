import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {StatViewCardConfig} from '../stats-button/stats-button';
import {StatIndicatorService} from '../../../../core/services/stat-indicator-service';
import {StatSeries} from '../../../../core/interfaces/api/stats-response';
import {ApexAxisChartSeries, ApexChart, ApexXAxis, ApexYAxis, ApexStroke, ApexDataLabels, ApexFill, ApexTooltip, ApexGrid, ApexMarkers } from 'ng-apexcharts'

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  fill: ApexFill,
  tooltip: ApexTooltip;
  grid: ApexGrid;
  markers: ApexMarkers
};

@Component({
  selector: 'app-stat',
  standalone: false,
  templateUrl: './stat.html',
  styleUrl: './stat.css'
})
export class Stat implements OnChanges{

  @Input() type!: StatViewCardConfig['type'];

  chartOptions!:Partial<ChartOptions>;
  loading = false;
  readonly patientId = 6;

  constructor(private indicatorService:StatIndicatorService) {
  }

  ngOnChanges() {
    if (!this.type){ return; }

    const indicatorId =  this.mapTypeToIndicator(this.type);
    this.loadData(indicatorId)
  }

  private mapTypeToIndicator(type: StatViewCardConfig['type']):number{
    switch(type){
      case 'bmi': return 1;
      case 'fat': return 2;
      case 'visceral-fat': return 3;
      case 'body-mass': return 4;
      case 'whr': return 5;
      default: return 1;
    }
  }

  private loadData(indicatorId:number){
    this.loading = true;

    this.indicatorService.getIndicatorSeries(this.patientId, indicatorId).subscribe({
      next: series => {
        this.buildChartOptions(series);
        this.loading = false;
      }, error: () => {
        this.loading = false;
      }
    })
  }

  private buildChartOptions(series: StatSeries){
    const seriesData = series.points.map(p => ({
      x: new Date(p.date),
      y: p.value
    }));

    this.chartOptions = {
      series: [
        {
        name: series.name,
        data: seriesData
        }
      ],
      chart: {
        type: 'area',
        height: 300,
        toolbar: {show: false},
        zoom: {enabled: false}
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        labels: {show: false},
        axisBorder: {show: false},
        axisTicks: {show:false}
      },
      grid: {
        show: false
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0,100]
        }
      },
      markers: {
        size: 0,
        hover: {size: 6}
      },
      tooltip: {
        x: {format: 'dd/MMM/yyyy'}
      }
    };
  }
}

import { Component, HostListener } from '@angular/core';
import { PatienFilterService } from '../../../../core/services/patien-filter-service';
import { SortOption } from '../../../../core/interfaces/api/patient-filter';

@Component({
  selector: 'app-filter',
  standalone: false,
  templateUrl: './filter.html',
  styleUrl: './filter.css'
})
export class Filter {

  menuOpen = false;
  currentFilter: string = 'Recién Agregado';

  constructor(private filterService: PatienFilterService) { }


  toggleMenu(event: Event) {
    event.stopPropagation(); // Evita que el click se propague
    this.menuOpen = !this.menuOpen;
  }

  // Cierra el menú cuando haces click fuera
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    this.menuOpen = false;
  }

  
  applyFilter(sortOption: SortOption, filterName: string): void {
    this.filterService.sort(sortOption);
    this.currentFilter = filterName;
    this.menuOpen = false;
  }
}

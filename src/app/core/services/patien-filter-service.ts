import { Injectable } from '@angular/core';
import { Patient } from '../interfaces/patient';
import { BehaviorSubject } from 'rxjs';
import { SortOption } from '../interfaces/api/patient-filter';
import { PatientFilter } from '../interfaces/api/patient-filter';

@Injectable({
  providedIn: 'root'
})
export class PatienFilterService {
  private originalPatients: Patient[] = [];
  private filteredPatientsSubject = new BehaviorSubject<Patient[]>([]);
  filteredPatients$ = this.filteredPatientsSubject.asObservable();

  private currentSearchTerm: string = '';
  private currentSortOption: SortOption = 'recent';


  private applyFilters(): void {
    let filtered = [...this.originalPatients];

    //busqueda
    if (this.currentSearchTerm) {
      filtered = filtered.filter(patient =>
        patient.firstName.toLowerCase().includes(this.currentSearchTerm) ||
        patient.lastName.toLowerCase().includes(this.currentSearchTerm) ||
        `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(this.currentSearchTerm)
      );
    }

    //orden del filtro 
    switch (this.currentSortOption) {
      case 'nameAsc':
        filtered.sort((a, b) =>
          `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
        );
        break;
      case 'nameDesc':
        filtered.sort((a, b) =>
          `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`)
        );
        break;
      case 'recent':
      default:
        filtered.sort((a, b) => (b.id || 0) - (a.id || 0)); //por id
        break;
    }
    this.filteredPatientsSubject.next(filtered); //pacientes filtrados
  }

  setPatients(patients: Patient[]): void {
    this.originalPatients = [...patients];
    this.applyFilters();
  }

  search(searchTerm: string): void {
    this.currentSearchTerm = searchTerm.toLowerCase().trim();
    this.applyFilters();
  }

  sort(sortOption: SortOption): void {
    this.currentSortOption = sortOption;
    this.applyFilters();
  }

  clearFilters(): void {
    this.currentSearchTerm = '';
    this.currentSortOption = 'recent';
    this.applyFilters();
  }
}

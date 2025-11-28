import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { PatienFilterService } from '../../../../core/services/patien-filter-service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: false,
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar implements OnInit, OnDestroy {

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  searchTerm: string = '';

  constructor(private filterService: PatienFilterService) { }

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300), // Espera 300ms después de que el usuario pare de escribir
      distinctUntilChanged(), // Solo busca si el término cambió
      takeUntil(this.destroy$)
    ).subscribe(searchTerm => {
      this.filterService.search(searchTerm);
    });
  }

  ngOnDestroy(): void { //destruir los observables al destruir el componente
      this.destroy$.next();
      this.destroy$.complete();
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.searchSubject.next(this.searchTerm);
  }

  onSearchSubmit(event?: Event): void {
    event?.preventDefault();
    this.filterService.search(this.searchTerm);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filterService.search('');
  }


}

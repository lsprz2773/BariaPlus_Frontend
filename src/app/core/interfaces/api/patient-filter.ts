export interface PatientFilter {
    search?: string;
    sortBy?: SortOption;
    page?: number;
    limit?: number;
}

export type SortOption = 'recent' | 'nameAsc' | 'nameDesc';
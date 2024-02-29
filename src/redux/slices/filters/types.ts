export type SortByType = {
    name: string
    type: string
    order: string
}

export type FilterType = {
    category: string | null
    status: string | null
}

export interface FilterSliceState {
    filter: FilterType
    sortBy: SortByType 
    searchValue: string
}

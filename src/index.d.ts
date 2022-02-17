export type AdvancedSearchQuery = {
    start_index?: string;
    company_name?: string;
    location?: string;
    incorporated_from?: string;
    incorporated_to?: string;
    sic_codes?: string;
    company_status?: string;
    company_type?: string;
    dissolved_from?: string;
    dissolved_to?: string;
    size?: number;
}

export type SearchQuery = {
    q: string;
    items_per_page?: number;
    start_index?: number;
}

export type AlphabetSearchQuery = {
    q: string;
    search_above?: string;
    search_below?: string;
    size?: string;
}

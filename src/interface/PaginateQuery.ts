export class PaginateQuery {
    sortField?: string;
    sortDirection?: 'ASC' | 'DESC';
    rowsPerPage: number;
    page: number;
}
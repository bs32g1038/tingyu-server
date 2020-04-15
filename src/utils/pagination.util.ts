interface Pagination {
    page: number;
    limit: number;
    rows: any[];
    count: number;
}

export const covertDataToStandardPaginationResult = (pagination: Pagination) => {
    return {
        results: pagination.rows,
        paging: {
            page: pagination.page,
            limit: pagination.limit,
            totalPages: Math.ceil(pagination.count / pagination.limit),
            totalItems: pagination.count,
        },
    };
};

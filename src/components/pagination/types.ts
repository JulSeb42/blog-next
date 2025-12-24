export interface IPagination {
	page: number
	totalPages: number
	setPage?: DispatchState<number>
}

export type Author = {
	id?: number
	name: string
	sources?: Source[]
}

export type Source = {
	id: number
	title: string
	author_id: number
	url: string
	publication_year: number
}

export type Quotation = {
	id: number
	content: string
	start_page?: number
	end_page?: number
	source_id: number
}

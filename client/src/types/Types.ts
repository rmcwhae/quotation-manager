export type Author = {
	ID: number
	Name: string
	Sources: Source[]
}

export type Source = {
	ID: number
	Title: string
	AuthorID: number
	Url: string
}

export type Quotation = {
	ID: number
	Excerpt: string
	Page: number
	SourceID: number
}

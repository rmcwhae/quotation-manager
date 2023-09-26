import { Quotation } from './Quotation'

export type Source = {
	id?: number
	title: string
	author: string
	url: string | null
	quotations: Quotation[]
}

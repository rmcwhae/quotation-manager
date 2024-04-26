import { Quotation as QuotationType } from '../types/Types'

export const Quotation = ({ quotation }: { quotation: QuotationType }) => {
	const { content, start_page, end_page } = quotation
	let pageText = ''

	if (start_page && end_page) {
		pageText = `(${start_page}–${end_page})`
	} else if (start_page) {
		pageText = `(${start_page})`
	}

	if (pageText) {
		return (
			<p>
				{content} {pageText}
			</p>
		)
	} else {
		return <p>{content}</p>
	}
}

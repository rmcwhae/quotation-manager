import { Quotation as QuotationType } from '../types/Quotation'

type Props = {
	quotation: QuotationType
}

export const Quotation = ({ quotation }: Props) => {
	const { content, start_page, end_page } = quotation
	return <div>{content}</div>
}

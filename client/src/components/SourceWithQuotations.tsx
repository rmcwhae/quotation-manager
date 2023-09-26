import { Source } from '../types/Source'
import { Quotation } from './Quotation'

type Props = {
	source: Source
}
export const SourceWithQuotations = ({ source }: Props) => {
	const { url, title, author, quotations } = source

	return (
		<>
			<div>
				{url ? <a href={url}>{title}</a> : <span>{title}</span>} by{' '}
				{author}
			</div>
			{quotations.map(quotation => (
				<Quotation key={quotation.id} quotation={quotation} />
			))}
		</>
	)
}

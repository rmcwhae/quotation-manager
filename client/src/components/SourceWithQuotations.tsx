import { Source } from '../types/Source'
import { Quotation } from './Quotation'

type Props = {
	source: Source
}
export const SourceWithQuotations = ({ source }: Props) => {
	const { url, title, author, quotations } = source

	return (
		<>
			<h2>
				{url ? (
					<a href={url} style={styles.heading}>
						{title}
					</a>
				) : (
					<span style={styles.heading}>{title}</span>
				)}{' '}
				by {author}
			</h2>
			{quotations.map(quotation => (
				<Quotation key={quotation.id} quotation={quotation} />
			))}
		</>
	)
}

const styles = {
	heading: {
		fontStyle: 'italic',
	},
}

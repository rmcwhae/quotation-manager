import { Source } from '../types/Source'
import { Quotation } from './Quotation'

type Props = {
	source: Source
	onClick: () => void
}
export const SourceWithQuotations = ({ source, onClick }: Props) => {
	const { url, title, author, quotations } = source

	return (
		<>
			<h2 onClick={onClick} style={styles.pointer}>
				<span>
					<span style={styles.italic}>{title}</span> by {author}
				</span>
				{url && (
					<a href={url} target="_blank" style={styles.link}>
						Visit
					</a>
				)}
			</h2>
			{quotations.map(quotation => (
				<Quotation key={quotation.id} quotation={quotation} />
			))}
		</>
	)
}

const styles = {
	pointer: {
		cursor: 'pointer',
	},
	italic: {
		fontStyle: 'italic',
	},
	link: {
		verticalAlign: 'middle',
		color: 'inherit',
		fontSize: '14.4px',
		fontWeight: 600,
		marginLeft: 'var(--s-1)',
		border: '1px solid',
		padding: 'var(--s-5) var(--s-2)',
		borderRadius: 99,
	},
}

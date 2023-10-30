import { useState } from 'preact/hooks'

import { Source } from '../types/Source'
import { Quotation } from './Quotation'
import { SourceForm } from './SourceForm'

type Props = {
	source: Source
	editable?: boolean
	onClick: () => void
}
export const SourceWithQuotations = ({
	source,
	editable = false,
	onClick,
}: Props) => {
	const { url, title, author, quotations } = source
	const [editing, setEditing] = useState(false)

	return (
		<>
			{editing && <SourceForm />}
			<h2 onClick={onClick} style={styles.pointer}>
				<span>
					<span style={styles.italic}>{title}</span> by {author}
				</span>
				{url && (
					<a href={url} target="_blank" className="button">
						Visit
					</a>
				)}
				{editable && (
					<button onClick={() => setEditing(true)}>Edit</button>
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
}

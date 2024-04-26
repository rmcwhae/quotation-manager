import { useState } from 'react'
import { postAuthor } from '../../services/Authors'
import { Collapsible } from '../Collapsible'

export const AddAuthorForm = () => {
	const [name, setName] = useState('')

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		await postAuthor({
			name,
		})
		setName('')
	}

	return (
		<Collapsible title="Add Author">
			<form onSubmit={handleSubmit} className="flex-between">
				<input
					type="text"
					value={name}
					placeholder="Name"
					onChange={e => setName(e.target.value)}
				/>
				<button type="submit">Add</button>
			</form>
		</Collapsible>
	)
}

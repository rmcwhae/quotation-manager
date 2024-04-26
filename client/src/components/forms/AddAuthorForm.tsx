import { useState } from 'react'
import { postAuthor } from '../../services/Authors'

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
		<form onSubmit={handleSubmit} className="flex-border">
			<input
				type="text"
				value={name}
				placeholder="Name"
				onChange={e => setName(e.target.value)}
			/>
			<button type="submit">Add Author</button>
		</form>
	)
}

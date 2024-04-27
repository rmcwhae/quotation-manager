import { useState } from 'react'
import { useAuthors } from '../hooks/use-authors-sources'
import { Author } from '../types/Types'
import { Source } from './Source'
import { SourceForm } from './forms/SourceForm'

const newSource = {
	title: '',
	url: undefined,
	publication_year: undefined,
}

export const AuthorListWithSources = () => {
	const { authors, isLoading } = useAuthors()
	const [showAddForm, setShowAddForm] = useState(false)

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (!isLoading && !authors) {
		return <div>Could not connect to the server</div>
	}

	return authors.map((author: Author) => (
		<div key={author.id}>
			<div className="flex-between">
				<h2>{author.name}</h2>
				<div
					onClick={() => setShowAddForm(!showAddForm)}
					className="cursor-pointer"
				>
					Add Source
				</div>
			</div>
			{showAddForm && (
				<SourceForm
					initialValues={{
						...newSource,
						author_id: author.id,
					}}
				/>
			)}
			{author.sources?.map(source => (
				<Source key={source.id} source={source} />
			))}
		</div>
	))
}

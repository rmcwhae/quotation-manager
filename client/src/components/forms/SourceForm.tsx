import { postSource } from '../../services/Sources'
import { Formik, Field, Form } from 'formik'
import { Source } from '../../types/Types'

type SourceFormProps = {
	initialValues: Source
}

export const SourceForm = ({ initialValues }: SourceFormProps) => {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={(values, actions) => {
				console.log('values', values)
				//postSource(values)
			}}
		>
			<Form>
				<div>
					<Field type="text" name="title" placeholder="Title" />
					<Field
						type="number"
						name="publication_year"
						placeholder="Publication Year"
					/>
					<Field type="text" name="url" placeholder="URL" />
				</div>
				<button type="submit">Add</button>
			</Form>
		</Formik>
	)
}

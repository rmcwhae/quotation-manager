import { useForm, SubmitHandler } from 'react-hook-form'
import { Quotation } from '../types/Quotation'
import { postQuotation } from '../services/Quotations'
import { useSources } from '../hooks/use-sources'

export const QuotationForm = ({ sourceId }: { sourceId: number }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Quotation>()
	const { mutate } = useSources()

	const onSubmit: SubmitHandler<Quotation> = async data => {
		data.source_id = sourceId
		await postQuotation(data)
		mutate()
	}

	return (
		<div>
			<h3 className="centered">Add a quotation</h3>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div style={styles.wrapper}>
					<input
						{...register('start_page', { required: false })}
						placeholder="Start Page"
					/>
					<input
						{...register('end_page', { required: false })}
						placeholder="End Page"
					/>
					<button type="submit">Submit</button>
				</div>
				<textarea
					style={styles.textbox}
					{...register('content', { required: true })}
					placeholder="Content"
				/>
			</form>
		</div>
	)
}

const styles = {
	wrapper: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 'var(--s-1)',
		margin: 'var(--s-1) 0',
	},
	textbox: {
		width: '100%',
		minHeight: '70px',
	},
}

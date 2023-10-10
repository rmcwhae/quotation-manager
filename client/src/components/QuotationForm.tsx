import { useForm, SubmitHandler } from 'react-hook-form'
import { Quotation } from '../types/Quotation'
import { postQuotation } from '../services/Quotations'
import { useSources } from '../hooks/use-sources'

export const QuotationForm = ({ sourceId }: { sourceId: number }) => {
	const {
		register,
		handleSubmit,
		// formState: { errors },
		reset,
	} = useForm<Quotation>()
	const { mutate } = useSources()

	const onSubmit: SubmitHandler<Quotation> = async data => {
		data.source_id = sourceId
		// TODO: is there a better way to do this?
		if (!data.start_page) {
			delete data.start_page
		} else {
			data.start_page = Number(data.start_page)
		}
		if (!data.end_page) {
			delete data.end_page
		} else {
			data.end_page = Number(data.end_page)
		}
		const response = await postQuotation(data)
		mutate()
		reset()
		// TODO: get me working
		if (response.status === 200) {
		} else {
			console.error(response.error)
		}
	}

	return (
		<div className="form-outline">
			<h3 className="centered">Add a quotation</h3>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex">
					<input
						type="number"
						style={styles.number}
						{...register('start_page', { required: false })}
						placeholder="Start Page"
					/>
					<input
						type="number"
						style={styles.number}
						{...register('end_page', { required: false })}
						placeholder="End Page"
					/>
				</div>
				<textarea
					style={styles.textbox}
					{...register('content', { required: true })}
					placeholder="Content"
				/>
				<button type="submit" className="submit">
					Submit
				</button>
			</form>
		</div>
	)
}

const styles = {
	textbox: {
		width: '100%',
		minHeight: '100px',
	},
	number: {
		width: 140,
	},
}

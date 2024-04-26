import { ReactNode, useState } from 'react'

export const Collapsible = ({
	title,
	children,
}: {
	title: string
	children: ReactNode
}) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<div className="collapse">
				<div className="flex-between">
					<div>{title}</div>
					<button onClick={() => setIsOpen(!isOpen)}>
						{isOpen ? '-' : '+'}
					</button>
				</div>
				{isOpen && children}
			</div>
		</>
	)
}

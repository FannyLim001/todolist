import { useState } from "react";

export interface Todo {
	id: number;
	title: string;
	date: string;
	isFinished: boolean;
}

interface FormProps {
	onFormSubmit: (formData: Todo) => void;
}

const Form: React.FC<FormProps> = ({ onFormSubmit }) => {
	// State variables to hold form data
	const [title, setTitle] = useState<string>("");
	const [date, setDate] = useState<string>("");

	// Function to handle form submission
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault(); // Prevent default form submission behavior

		// Create an object to hold form data
		const newTodo: Todo = {
			id: +new Date(),
			title: title,
			date: date,
			isFinished: false,
		};

		// Pass the new todo to the parent component
		onFormSubmit(newTodo);

		// Clear form fields after submission
		setTitle("");
		setDate("");
	};

	return (
		<>
			<div className="wrapper mx-auto">
				<h2 className="text-center">Add List</h2>
				<form onSubmit={handleSubmit}>
					{" "}
					{/* Attach handleSubmit function to form submission */}
					<div className="mb-3">
						<label htmlFor="title" className="form-label">
							What do you want to do?
						</label>
						<input
							type="text"
							className="form-control"
							id="title"
							aria-describedby="emailHelp"
							value={title} // Bind value to state variable
							onChange={(e) => setTitle(e.target.value)} // Update state variable on change
							required // Mark field as required
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="date" className="form-label">
							How about the date?
						</label>
						<input
							type="date"
							className="form-control"
							id="date"
							value={date} // Bind value to state variable
							onChange={(e) => setDate(e.target.value)} // Update state variable on change
							required // Mark field as required
						/>
					</div>
					<div className="d-flex justify-content-end">
						<button type="submit" className="btn-submit">
							Submit
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default Form;

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleCheck as faCircleCheckRegular,
	faTrashCan as faTrashCanRegular,
} from "@fortawesome/free-regular-svg-icons";
import {
	faCircleCheck as faCircleCheckSolid,
	faRotateRight,
	faTrashCan as faTrashCanSolid,
} from "@fortawesome/free-solid-svg-icons";
import { Todo } from "./Form";

interface Props {
	heading: string;
	localStorageData: Todo[];
	updateLocalStorageData: (updatedData: Todo) => void;
	deleteTodo: (id: number) => void;
}

const Todos = ({
	heading,
	localStorageData,
	updateLocalStorageData,
	deleteTodo,
}: Props) => {
	// Initialize an array of boolean states to track hover state for each list item
	const [isHovered, setIsHovered] = useState<boolean[]>(
		Array(localStorageData.length).fill(false)
	);

	// Function to handle hover state for a specific index
	const handleHover = (index: number, hoverState: boolean) => {
		const updatedHoverState = [...isHovered]; // Create a copy of the current state
		updatedHoverState[index] = hoverState; // Update the hover state for the specific index
		setIsHovered(updatedHoverState); // Update the state
	};

	// Function to handle clicking the check button
	const handleCheckButtonClick = (id: number) => {
		// Find the todo item with the given id
		const todoItem = localStorageData.find((item) => item.id === id);
		if (todoItem) {
			// Update the isFinished property to true
			updateLocalStorageData({ ...todoItem, isFinished: true });
		}
	};

	const handleResetButtonClick = (id: number) => {
		// Find the todo item with the given id
		const todoItem = localStorageData.find((item) => item.id === id);
		if (todoItem) {
			// Update the isFinished property to true
			updateLocalStorageData({ ...todoItem, isFinished: false });
		}
	};

	const handleTrashButtonClick = (id: number) => {
		// Call the deleteTodo function passed as a prop
		deleteTodo(id);
	};

	return (
		<div className="container mx-auto">
			<h2>{heading}</h2>
			{localStorageData.map((todo, index) => (
				<div className="list-item" key={todo.id}>
					<div className="row">
						<div className="col">
							<h3>{todo.title}</h3>
							<p>{todo.date}</p>
						</div>
						<div className="col d-flex justify-content-end">
							{todo.isFinished ? (
								<>
									<button
										className="action-btn"
										onClick={() => handleResetButtonClick(todo.id)}>
										<FontAwesomeIcon
											icon={faRotateRight}
											size="2xl"
											style={{ color: "#88dfff" }}
										/>
									</button>
									<button
										className="action-btn"
										onMouseEnter={() => handleHover(index, true)}
										onMouseLeave={() => handleHover(index, false)}
										onClick={() => handleTrashButtonClick(todo.id)}>
										<FontAwesomeIcon
											icon={isHovered[index] ? faTrashCanSolid : faTrashCanRegular}
											size="2xl"
											style={{ color: "#88dfff" }}
										/>
									</button>
								</>
							) : (
								<button
									className="action-btn"
									onMouseEnter={() => handleHover(index, true)}
									onMouseLeave={() => handleHover(index, false)}
									onClick={() => handleCheckButtonClick(todo.id)}>
									<FontAwesomeIcon
										icon={isHovered[index] ? faCircleCheckSolid : faCircleCheckRegular}
										size="2xl"
										style={{ color: "#88dfff" }}
									/>
								</button>
							)}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Todos;

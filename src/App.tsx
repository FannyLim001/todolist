import { useState, useEffect } from "react";
import Form, { Todo } from "./components/Form";
import Navbar from "./components/Navbar";
import Todos from "./components/Todos";

// Type for the form data if necessary (adjust as per your form fields)
type FormData = Todo;

function App() {
	// State to hold todos, now using the Todo type
	const [localStorageData, setLocalStorageData] = useState<Todo[]>([]);

	// Retrieve todos from localStorage on initial render
	useEffect(() => {
		const localStorageDataString = localStorage.getItem("ToDoList");
		const localStorageData = localStorageDataString
			? JSON.parse(localStorageDataString)
			: [];
		setLocalStorageData(localStorageData);
	}, []);

	// Function to update localStorageData
	const updateLocalStorageData = (updatedData: Todo) => {
		const updatedTodos = [...localStorageData];
		const index = updatedTodos.findIndex((todo) => todo.id === updatedData.id);
		if (index !== -1) {
			updatedTodos[index] = { ...updatedTodos[index], ...updatedData };
		} else {
			updatedTodos.push(updatedData);
		}
		localStorage.setItem("ToDoList", JSON.stringify(updatedTodos));
		setLocalStorageData(updatedTodos);
	};

	// Function to delete a todo item
	const deleteTodo = (id: number) => {
		const updatedTodos = localStorageData.filter((todo) => todo.id !== id);
		localStorage.setItem("ToDoList", JSON.stringify(updatedTodos));
		setLocalStorageData(updatedTodos);
	};

	// Function to handle form submission in the App component
	const handleFormSubmit = (formData: FormData) => {
		updateLocalStorageData(formData);
	};

	// Filter todos based on whether they are finished or not
	const todosInProgress = localStorageData.filter((todo) => !todo.isFinished);
	const finishedTodos = localStorageData.filter((todo) => todo.isFinished);

	return (
		<>
			<div>
				<Navbar />
				<Form onFormSubmit={handleFormSubmit} />
				<Todos
					heading="To Do"
					localStorageData={todosInProgress}
					updateLocalStorageData={updateLocalStorageData}
					deleteTodo={deleteTodo}
				/>
				<Todos
					heading="Finished To Do"
					localStorageData={finishedTodos}
					updateLocalStorageData={updateLocalStorageData}
					deleteTodo={deleteTodo}
				/>
			</div>
		</>
	);
}

export default App;

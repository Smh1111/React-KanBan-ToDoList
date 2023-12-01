import { useState } from "react";
import { createClient } from "@supabase/supabase-js"; // Make sure to import the useSupabase hook from your Supabase configuration
import { REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY } from "../config";

type Todo = {
	id: number;
	created_at: string;
	task: string;
};

const supabaseUrl: string = REACT_APP_SUPABASE_URL;
const supabaseKey: string = REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
function InputForm() {
	const [taskInput, setTaskInput] = useState("");

	const handleAddTask = async () => {
		try {
			// Check if taskInput is not empty
			if (taskInput.trim() === "") {
				return;
			}

			const { data, error } = await supabase
				.from("todolists")
				.insert([
					{
						task: taskInput,
					},
				]);

			if (error) {
				throw error;
			}

			// Check for the existence of data before accessing it
			if (data) {
				// Reset the input field after successful insertion
				setTaskInput("");
			}
		} catch (error) {
			console.error("Error adding task:", error);
		}
	};

	return (
		<form className="justify-center flex text-center m-10 font-mono">
			<div className="flex">
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					type="button"
					onClick={handleAddTask}>
					Add
				</button>

				<input
					type="text"
					id="taskInput"
					value={taskInput}
					onChange={(e) =>
						setTaskInput(
							e.target
								.value
						)
					}
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Enter your task"
					required></input>
			</div>
		</form>
	);
}

export default InputForm;

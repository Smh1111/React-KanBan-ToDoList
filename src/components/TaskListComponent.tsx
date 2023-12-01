"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import TaskComponent from "./TaskComponent";
import { REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY } from "../config";

const supabaseUrl: string = REACT_APP_SUPABASE_URL;
const supabaseKey: string = REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

type Task = {
	id: number;
	created_at: string; // Corrected property name
	task: string;
};

function TaskListComponent() {
	const [tasks, setTasks] = useState<Task[]>([]);

	useEffect(() => {
		getTasks();
	}, []);

	async function getTasks() {
		try {
			const { data, error } = await supabase
				.from("todolists")
				.select();
			if (error) {
				console.error(
					"Error fetching data:",
					error
				);
			} else {
				setTasks(data);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	}

	async function deleteTask(deleteID: number) {
		try {
			const { data, error } = await supabase
				.from("todolists")
				.delete()
				.eq("id", deleteID);
			if (error) {
				console.error(
					"Error deleting data:",
					data,
					error
				);
			} else {
				setTasks(
					tasks.filter(
						(task) =>
							task.id !==
							deleteID
					)
				);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	}

	async function updateTask(updateID: number, updatedTask: string) {
		try {
			const { data, error } = await supabase
				.from("todolists")
				.update({ task: updatedTask })
				.eq("id", updateID);
			if (error) {
				console.error(
					"Error updating data:",
					data,
					error
				);
			} else {
				// Update the existing task in the state
				setTasks((prevTasks) =>
					prevTasks.map((t) =>
						t.id === updateID
							? {
									...t,
									task: updatedTask,
							  }
							: t
					)
				);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	}

	return (
		<div className="flex flex-wrap justify-center">
			{tasks.map((task) => (
				<TaskComponent
					key={task.id}
					task={task}
					deleteTask={() =>
						deleteTask(task.id)
					}
					updateTask={(updatedTask) =>
						updateTask(
							task.id,
							updatedTask
						)
					}
				/>
			))}
		</div>
	);
}

export default TaskListComponent;

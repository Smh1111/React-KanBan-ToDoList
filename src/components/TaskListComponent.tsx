"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import TaskComponent from "./TaskComponent";



const supabaseUrl: string = "https://onshivmcmawiknfqbcmv.supabase.co";
const supabaseKey: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uc2hpdm1jbWF3aWtuZnFiY212Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEyNzA4ODksImV4cCI6MjAxNjg0Njg4OX0.vHyLFyVK_jvYJ1EaYjOJ_-YEus1xEw5NoYCgcgnS0XY";

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


	async function deleteTask(deleteID : number) {
		try {
			const { data, error } = await supabase
				.from("todolists")
				.delete()
				.eq("id", deleteID);
			if (error) {
				console.error(
					"Error deleting data:",
					error
				);
			} else {
				setTasks(tasks.filter((task) => task.id !== deleteID));
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
					deleteTask={() => deleteTask(task.id)}

				/>
			))}
		</div>
	);
}

export default TaskListComponent;

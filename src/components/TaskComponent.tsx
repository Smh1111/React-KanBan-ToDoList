import React, { useState } from "react";

type Task = {
	id: number;
	created_at: string;
	task: string;
};

interface TaskComponentProps {
	task: Task;
	deleteTask: () => void;
	updateTask: (updatedTask: string) => void;
}

const TaskComponent: React.FC<TaskComponentProps> = ({
	task,
	deleteTask,
	updateTask,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedTask, setEditedTask] = useState(task.task);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleCancelEdit = () => {
		setIsEditing(false);
		setEditedTask(task.task);
	};

	const handleSaveEdit = () => {
		setIsEditing(false);
		updateTask(editedTask);
	};
	const timestamp : string = task.created_at;
	const formattedDate = new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		
	}).format(new Date(timestamp));



	return (
		<div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden m-4">
			<div className="px-6 py-4">
				{isEditing ? (
					<>
						<input
							type="text"
							value={
								editedTask
							}
							onChange={(
								e
							) =>
								setEditedTask(
									e
										.target
										.value
								)
							}
							className="mb-2 border-b-2 border-blue-500 focus:outline-none"
						/>
						<button
							className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-2 rounded"
							onClick={
								handleSaveEdit
							}>
							Save
						</button>
						<button
							className="bg-gray-500 hover.bg-gray-700 text-white font-bold py-2 px-4 rounded"
							onClick={
								handleCancelEdit
							}>
							Cancel
						</button>
					</>
				) : (
					<>
						<div className="font-bold text-xl mb-2">
							{
								task.task
							}
							<div className="text-xs text-gray-500">
                {formattedDate}
              </div>
						</div>
            
						<button
							className="bg-blue-500 hover.bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded"
							onClick={
								handleEditClick
							}>
							Edit
						</button>
						<button
							className="bg-red-500 hover.bg-red-700 text-white font-bold py-2 px-4 rounded"
							onClick={
								deleteTask
							}>
							Delete
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default TaskComponent;

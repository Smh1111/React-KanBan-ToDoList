// TaskComponent.tsx
import React from 'react';

type Task = {
  id: number;
  created_at: string;
  task: string;
};

interface TaskComponentProps {
  task: Task;
  deleteTask: () => void;
}

const TaskComponent: React.FC<TaskComponentProps> = ({ task, deleteTask }) => {
  return (
    <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden m-4">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{task.task}</div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded"> Edit </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={deleteTask}> Delete </button>
      </div>
    </div>
  );
};

export default TaskComponent;

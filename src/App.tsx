import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://onshivmcmawiknfqbcmv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uc2hpdm1jbWF3aWtuZnFiY212Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEyNzA4ODksImV4cCI6MjAxNjg0Njg4OX0.vHyLFyVK_jvYJ1EaYjOJ_-YEus1xEw5NoYCgcgnS0XY");

type Task = {
  id: number;
  created_at: string; // Corrected property name
  task: string;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks();
  }, []);

  async function getTasks() {
    try {
      const { data, error } = await supabase.from("todolists").select();
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setTasks(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <ul>
      {
        tasks.map((task) => (
          <li key={task.id}>{task.task}</li>
        ))
      }
    </ul>
  );
}

export default App;

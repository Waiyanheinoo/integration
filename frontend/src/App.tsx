import { useEffect, useState } from "react";
import type { Task, Status, TaskFormData } from "./types/task";
import TaskColumn from "./components/TaskColumn";
import TaskModal from "./components/TaskModal";
import "./App.css";
import {
  createTaskRecord,
  initialTasks,
  updateTaskRecord,
} from "./data/mockTasks";

const STATUSES: Status[] = ["TODO", "IN_PROGRESS", "DONE"];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() =>
    initialTasks.map((task) => ({ ...task })),
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);
  const [toast, setToast] = useState<{ msg: string; error?: boolean } | null>(
    null,
  );

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  function showToast(msg: string, error = false) {
    setToast({ msg, error });
  }

  function openCreate() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(task: Task) {
    setEditing(task);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditing(null);
  }

  async function handleSubmit(data: TaskFormData) {
    if (editing) {
      const updatedTask = updateTaskRecord(editing, data);
      setTasks((current) =>
        current.map((task) => (task.id === editing.id ? updatedTask : task)),
      );
      showToast("Task updated");
    } else {
      const newTask = createTaskRecord(data);
      setTasks((current) => [newTask, ...current]);
      showToast("Task created");
    }
    closeModal();
  }

  async function handleDelete(id: string) {
    setTasks((current) => current.filter((task) => task.id !== id));
    showToast("Task deleted");
  }

  return (
    <>
      <header>
        <h1>
          Task Manager <span>/ Mock Frontend Data</span>
        </h1>
        <button className="btn btn-primary" onClick={openCreate}>
          + New Task
        </button>
      </header>

      <main>
        <div className="board">
          {STATUSES.map((status) => (
            <TaskColumn
              key={status}
              status={status}
              tasks={tasks.filter((t) => t.status === status)}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </main>

      {modalOpen && (
        <TaskModal
          task={editing}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      )}

      {toast && (
        <div className={`toast show${toast.error ? " error" : ""}`}>
          {toast.msg}
        </div>
      )}
    </>
  );
}

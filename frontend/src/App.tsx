import { useEffect, useState, useCallback } from "react";
import type { Task, Status, TaskFormData } from "./types/task";
import { getTasks, createTask, updateTask, deleteTask } from "./api/tasks";
import TaskColumn from "./components/TaskColumn";
import TaskModal from "./components/TaskModal";
import "./App.css";

const STATUSES: Status[] = ["TODO", "IN_PROGRESS", "DONE"];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);
  const [toast, setToast] = useState<{ msg: string; error?: boolean } | null>(
    null,
  );

  const load = useCallback(async () => {
    try {
      setTasks(await getTasks());
    } catch {
      showToast("Failed to load tasks", true);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

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
      await updateTask(editing.id, data);
      showToast("Task updated");
    } else {
      await createTask(data);
      showToast("Task created");
    }
    closeModal();
    load();
  }

  async function handleDelete(id: string) {
    try {
      await deleteTask(id);
      showToast("Task deleted");
      load();
    } catch {
      showToast("Failed to delete task", true);
    }
  }

  return (
    <>
      <header>
        <h1>
          Task Manager <span>/ Prisma + Axios</span>
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

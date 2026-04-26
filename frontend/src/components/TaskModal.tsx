import { useEffect, useRef, useState } from "react";
import type { Task, TaskFormData } from "../types/task";

interface Props {
  task: Task | null;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => Promise<void>;
}

const EMPTY: TaskFormData = {
  title: "",
  description: "",
  status: "TODO",
  priority: "MEDIUM",
};

export default function TaskModal({ task, onClose, onSubmit }: Props) {
  const [form, setForm] = useState<TaskFormData>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setForm(
      task
        ? {
            title: task.title,
            description: task.description ?? "",
            status: task.status,
            priority: task.priority,
          }
        : EMPTY
    );
    setError("");
    setTimeout(() => titleRef.current?.focus(), 50);
  }, [task]);

  const set = <K extends keyof TaskFormData>(key: K, value: TaskFormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await onSubmit({
        ...form,
        description: form.description?.trim() || undefined,
      } as TaskFormData);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: Array<{ message?: string }> } })
          ?.response?.data?.[0]?.message ?? "Something went wrong";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal-backdrop open"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal">
        <h2>{task ? "Edit Task" : "New Task"}</h2>

        {error && <p className="form-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="f-title">Title</label>
            <input
              ref={titleRef}
              id="f-title"
              type="text"
              placeholder="What needs to be done?"
              required
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="f-desc">Description</label>
            <textarea
              id="f-desc"
              placeholder="Optional details..."
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="f-status">Status</label>
              <select
                id="f-status"
                value={form.status}
                onChange={(e) => set("status", e.target.value as TaskFormData["status"])}
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="f-priority">Priority</label>
              <select
                id="f-priority"
                value={form.priority}
                onChange={(e) => set("priority", e.target.value as TaskFormData["priority"])}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Saving…" : task ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

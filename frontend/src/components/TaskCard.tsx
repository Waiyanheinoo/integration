import type { Task } from "../types/task";

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const PRIORITY_CLASS: Record<string, string> = {
  LOW: "badge-low",
  MEDIUM: "badge-medium",
  HIGH: "badge-high",
};

export default function TaskCard({ task, onEdit, onDelete }: Props) {
  const date = new Date(task.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="task-card">
      <div className="task-card-top">
        <span className="task-title">{task.title}</span>
        <div className="task-actions">
          <button
            className="icon-btn"
            title="Edit"
            onClick={() => onEdit(task)}
          >
            ✏️
          </button>
          <button
            className="icon-btn delete"
            title="Delete"
            onClick={() => {
              if (window.confirm("Delete this task?")) onDelete(task.id);
            }}
          >
            🗑️
          </button>
        </div>
      </div>

      {task.description && (
        <p className="task-desc">{task.description}</p>
      )}

      <div className="task-footer">
        <span className={`badge ${PRIORITY_CLASS[task.priority]}`}>
          {task.priority}
        </span>
        <span className="task-date">{date}</span>
      </div>
    </div>
  );
}

import type { Task, Status } from "../types/task";
import TaskCard from "./TaskCard";

interface Props {
  status: Status;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const COLUMN_META: Record<Status, { label: string; className: string }> = {
  TODO: { label: "To Do", className: "todo" },
  IN_PROGRESS: { label: "In Progress", className: "progress" },
  DONE: { label: "Done", className: "done" },
};

export default function TaskColumn({ status, tasks, onEdit, onDelete }: Props) {
  const { label, className } = COLUMN_META[status];

  return (
    <div className="column">
      <div className={`column-header ${className}`}>
        <span className="dot" />
        {label}
        <span className="count">{tasks.length}</span>
      </div>

      <div className="column-body">
        {tasks.length === 0 ? (
          <div className="empty-state">No tasks here</div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

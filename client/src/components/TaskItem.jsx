import { useState } from 'react';

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.text);
  const [saving, setSaving] = useState(false);

  async function saveEdit() {
    if (!value.trim()) return;
    try {
      setSaving(true);
      await onEdit(task._id, value.trim());
      setEditing(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <li className="item">
      <input
        type="checkbox"
        className="checkbox"
        checked={!!task.completed}
        onChange={() => onToggle(task._id, !task.completed)}
      />
      {editing ? (
        <input
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') saveEdit();
            if (e.key === 'Escape') {
              setEditing(false);
              setValue(task.text);
            }
          }}
        />
      ) : (
        <div className={`text ${task.completed ? 'completed' : ''}`}>{task.text}</div>
      )}

      <div className="row">
        {editing ? (
          <button className="icon-btn" onClick={saveEdit} disabled={saving}>
            {saving ? 'Saving' : 'Save'}
          </button>
        ) : (
          <button className="icon-btn" onClick={() => setEditing(true)}>Edit</button>
        )}
        <button className="icon-btn danger" onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </li>
  );
}

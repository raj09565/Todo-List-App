import { useState } from 'react';

export default function TaskForm({ onAdd }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      setLoading(true);
      await onAdd(text.trim());
      setText('');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        className="input"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={loading}
      />
      <button className="button" disabled={loading || !text.trim()}>
        {loading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
}

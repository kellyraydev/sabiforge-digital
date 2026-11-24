import { useRef, useState } from 'react';

/**
 * FlowDesk OS demo: Now / Next / Later board. Fictional product, sample tasks only.
 * No totals, percentages, revenue or people. Palette: slate #1C2430, navy #243B5A,
 * cloud #F4F7FB, teal #3E7C78.
 */
type Column = 'now' | 'next' | 'later' | 'done';
interface Task {
  id: number;
  title: string;
  team: string;
  column: Column;
}

const columns: { id: Exclude<Column, 'done'>; label: string; hint: string }[] = [
  { id: 'now', label: 'Now', hint: 'In progress today' },
  { id: 'next', label: 'Next', hint: 'Starts when Now clears' },
  { id: 'later', label: 'Later', hint: 'Agreed, not scheduled' },
];

const teams = ['Operations', 'Sales', 'Finance', 'Support'];

const initial: Task[] = [
  { id: 1, title: 'Confirm delivery slots with the warehouse', team: 'Operations', column: 'now' },
  { id: 2, title: 'Reply to new enquiries from the website', team: 'Sales', column: 'now' },
  { id: 3, title: 'Prepare supplier invoices for approval', team: 'Finance', column: 'next' },
  { id: 4, title: 'Update the returns help page', team: 'Support', column: 'next' },
  { id: 5, title: 'Plan the stock count for next month', team: 'Operations', column: 'later' },
];

const ring =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7eb8b4]';

export default function FlowDeskDemo() {
  const [tasks, setTasks] = useState<Task[]>(initial);
  const [title, setTitle] = useState('');
  const [team, setTeam] = useState(teams[0]);
  const [error, setError] = useState('');
  const [log, setLog] = useState('');
  const nextId = useRef(initial.length + 1);
  const input = useRef<HTMLInputElement>(null);

  const move = (task: Task, to: Column) => {
    setTasks((all) => all.map((t) => (t.id === task.id ? { ...t, column: to } : t)));
    setLog(
      to === 'done'
        ? `“${task.title}” marked done.`
        : `“${task.title}” moved to ${columns.find((c) => c.id === to)?.label}.`,
    );
  };

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length < 3) {
      setError('Write a short task title.');
      input.current?.focus();
      return;
    }
    const task = { id: nextId.current++, title: title.trim(), team, column: 'later' as const };
    setTasks((all) => [...all, task]);
    setTitle('');
    setError('');
    setLog(`“${task.title}” added to Later.`);
  };

  const done = tasks.filter((t) => t.column === 'done');

  return (
    <div className="bg-[#F4F7FB] font-sans text-[#1C2430]" data-flowdesk>
      <header className="flex items-center justify-between bg-[#1C2430] px-4 py-3 text-[#F4F7FB] sm:px-6">
        <span className="font-semibold tracking-tight">FlowDesk</span>
        <span className="rounded-full bg-[#243B5A] px-3 py-1 text-xs">Sample workspace</span>
      </header>

      <div className="px-4 py-5 sm:px-6">
        <form onSubmit={add} className="flex flex-col gap-2 sm:flex-row sm:items-end" noValidate>
          <div className="flex-1">
            <label htmlFor="fd-title" className="text-sm font-semibold">
              New task
            </label>
            <input
              id="fd-title"
              ref={input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? 'fd-error' : undefined}
              placeholder="e.g. Call back the caterer"
              className={`mt-1 min-h-11 w-full rounded-lg border border-[#1C2430]/20 bg-white px-3 text-sm ${ring}`}
            />
          </div>
          <div>
            <label htmlFor="fd-team" className="text-sm font-semibold">
              Team
            </label>
            <select
              id="fd-team"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              className={`mt-1 min-h-11 w-full rounded-lg border border-[#1C2430]/20 bg-white px-3 text-sm ${ring}`}
            >
              {teams.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className={`min-h-11 rounded-lg bg-[#243B5A] px-4 text-sm font-semibold text-white ${ring}`}
          >
            Add to Later
          </button>
        </form>
        {error && (
          <p id="fd-error" role="alert" className="mt-1 text-sm font-semibold text-[#a3341f]">
            {error}
          </p>
        )}

        <div className="mt-5 grid gap-4 md:grid-cols-3" data-flowdesk-board>
          {columns.map((col, ci) => {
            const items = tasks.filter((t) => t.column === col.id);
            return (
              <section
                key={col.id}
                aria-labelledby={`fd-col-${col.id}`}
                className={`rounded-xl border p-3 ${col.id === 'now' ? 'border-[#3E7C78] bg-[#3E7C78]/10' : 'border-[#1C2430]/10 bg-white'}`}
                data-column={col.id}
              >
                <h2 id={`fd-col-${col.id}`} className="flex items-baseline justify-between">
                  <span className="font-semibold">{col.label}</span>
                  <span className="text-xs text-[#4a5566]">{col.hint}</span>
                </h2>
                <ul className="mt-3 space-y-2">
                  {items.length === 0 && (
                    <li className="rounded-lg border border-dashed border-[#1C2430]/20 p-3 text-sm text-[#4a5566]">
                      Nothing here.
                    </li>
                  )}
                  {items.map((task) => (
                    <li
                      key={task.id}
                      className="rounded-lg border border-[#1C2430]/10 bg-white p-3 shadow-sm"
                    >
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="mt-1 text-xs text-[#4a5566]">
                        {task.team} · <span className="font-semibold">Sample</span>
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {ci > 0 && (
                          <button
                            type="button"
                            onClick={() => move(task, columns[ci - 1].id)}
                            className={`min-h-9 rounded-md border border-[#1C2430]/20 px-2 text-xs font-semibold ${ring}`}
                          >
                            ← {columns[ci - 1].label}
                            <span className="sr-only">: {task.title}</span>
                          </button>
                        )}
                        {ci < columns.length - 1 && (
                          <button
                            type="button"
                            onClick={() => move(task, columns[ci + 1].id)}
                            className={`min-h-9 rounded-md border border-[#1C2430]/20 px-2 text-xs font-semibold ${ring}`}
                          >
                            {columns[ci + 1].label} →<span className="sr-only">: {task.title}</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => move(task, 'done')}
                          className={`min-h-9 rounded-md bg-[#3E7C78] px-2 text-xs font-semibold text-white ${ring}`}
                        >
                          Done<span className="sr-only">: {task.title}</span>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        {done.length > 0 && (
          <details className="mt-4 rounded-xl border border-[#1C2430]/10 bg-white p-3" data-done>
            <summary className={`cursor-pointer text-sm font-semibold ${ring}`}>
              Done ({done.length})
            </summary>
            <ul className="mt-2 space-y-1 text-sm text-[#4a5566]">
              {done.map((t) => (
                <li key={t.id} className="flex items-center justify-between gap-2">
                  <span className="line-through">{t.title}</span>
                  <button
                    type="button"
                    onClick={() => move(t, 'now')}
                    className={`min-h-9 text-xs font-semibold text-[#243B5A] underline ${ring}`}
                  >
                    Reopen<span className="sr-only">: {t.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </details>
        )}

        <p role="status" className="mt-3 min-h-5 text-sm text-[#243B5A]" data-flowdesk-log>
          {log}
        </p>
      </div>
    </div>
  );
}

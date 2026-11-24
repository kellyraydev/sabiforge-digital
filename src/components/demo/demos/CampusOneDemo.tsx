import { useState } from 'react';

/**
 * CampusOne Portal demo: study home. Fictional; no institution, crest, grades or records.
 * Palette: navy #12315C, porcelain #F4F7FB, sky #D5E4F5, ochre #C4A15A.
 */
const lessons = [
  'Lesson 1: What data is',
  'Lesson 2: Collecting data',
  'Lesson 3: Tables and spreadsheets',
  'Lesson 4: Simple charts',
  'Lesson 5: Telling a story with data',
];

const modules = [
  { name: 'Sample module: Introduction to Data', state: 'In progress' },
  { name: 'Sample module: Writing for Work', state: 'Next' },
  { name: 'Sample module: Small Business Basics', state: 'Later' },
];

const initialTasks = [
  { id: 't1', label: 'Read the lesson 3 notes', done: false },
  { id: 't2', label: 'Post one question in the study group', done: false },
  { id: 't3', label: 'Try the practice spreadsheet', done: true },
];

type Tab = 'home' | 'modules' | 'tasks';
const TABS: { id: Tab; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'modules', label: 'Modules' },
  { id: 'tasks', label: 'Tasks' },
];

const ring =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A15A]';

export default function CampusOneDemo() {
  const [tab, setTab] = useState<Tab>('home');
  const [completed, setCompleted] = useState(2);
  const [tasks, setTasks] = useState(initialTasks);
  const [notice, setNotice] = useState('');

  const finished = completed >= lessons.length;
  const openTasks = tasks.filter((t) => !t.done).length;

  const onTabKey = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const next = (index + (e.key === 'ArrowRight' ? 1 : TABS.length - 1)) % TABS.length;
    setTab(TABS[next].id);
    document.getElementById(`co-tab-${TABS[next].id}`)?.focus();
  };

  return (
    <div className="bg-[#F4F7FB] font-sans text-[#12315C]" data-campus>
      <header className="flex items-center justify-between bg-[#12315C] px-4 py-3 text-[#F4F7FB] sm:px-6">
        <span className="font-semibold">CampusOne</span>
        <span className="text-xs text-[#D5E4F5]">Sample study home · not a real institution</span>
      </header>

      <div
        role="tablist"
        aria-label="Portal sections"
        className="flex gap-1 border-b border-[#12315C]/10 bg-white px-2 sm:px-4"
      >
        {TABS.map((t, i) => (
          <button
            key={t.id}
            id={`co-tab-${t.id}`}
            role="tab"
            type="button"
            aria-selected={tab === t.id}
            aria-controls={`co-panel-${t.id}`}
            tabIndex={tab === t.id ? 0 : -1}
            onClick={() => setTab(t.id)}
            onKeyDown={(e) => onTabKey(e, i)}
            className={`min-h-12 border-b-2 px-4 text-sm font-semibold ${ring} ${
              tab === t.id ? 'border-[#C4A15A] text-[#12315C]' : 'border-transparent text-[#4a5f7d]'
            }`}
          >
            {t.label}
            {t.id === 'tasks' && openTasks > 0 && (
              <span className="ml-1.5 rounded-full bg-[#D5E4F5] px-1.5 text-xs">{openTasks}</span>
            )}
          </button>
        ))}
      </div>

      <div className="px-4 py-5 sm:px-6">
        {tab === 'home' && (
          <div id="co-panel-home" role="tabpanel" aria-labelledby="co-tab-home" data-campus-home>
            <section className="rounded-2xl bg-[#12315C] p-5 text-[#F4F7FB]">
              <p className="text-xs font-semibold tracking-[0.14em] text-[#C4A15A] uppercase">
                Current module
              </p>
              <h2 className="mt-1 text-xl font-semibold">{modules[0].name}</h2>
              <p className="mt-2 text-sm text-[#D5E4F5]" data-lesson-progress>
                {finished
                  ? 'All lessons complete.'
                  : `${completed} of ${lessons.length} lessons complete. Up next: ${lessons[completed]}.`}
              </p>
              <div
                className="mt-3 h-2 overflow-hidden rounded-full bg-white/15"
                role="progressbar"
                aria-label="Lessons complete"
                aria-valuemin={0}
                aria-valuemax={lessons.length}
                aria-valuenow={completed}
              >
                <div
                  className="h-full bg-[#C4A15A]"
                  style={{ width: `${(completed / lessons.length) * 100}%` }}
                />
              </div>
              <button
                type="button"
                disabled={finished}
                onClick={() => {
                  setNotice(`${lessons[completed]} marked complete.`);
                  setCompleted((c) => c + 1);
                }}
                className={`mt-4 min-h-11 rounded-full bg-[#C4A15A] px-5 text-sm font-semibold text-[#12315C] disabled:opacity-60 ${ring}`}
              >
                {finished ? 'Module complete' : `Complete lesson ${completed + 1}`}
              </button>
            </section>
            <section className="mt-4 grid gap-3 sm:grid-cols-2" aria-label="Study areas">
              {[
                ['Study group', 'Ask and answer questions with your sample class.'],
                ['Library', 'Readings and recordings for each lesson.'],
              ].map(([title, body]) => (
                <div key={title} className="rounded-xl border border-[#12315C]/10 bg-white p-4">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-[#4a5f7d]">{body}</p>
                </div>
              ))}
            </section>
          </div>
        )}

        {tab === 'modules' && (
          <div id="co-panel-modules" role="tabpanel" aria-labelledby="co-tab-modules">
            <ul className="space-y-2" data-campus-modules>
              {modules.map((m) => (
                <li
                  key={m.name}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[#12315C]/10 bg-white p-4"
                >
                  <span className="font-medium">{m.name}</span>
                  <span className="shrink-0 rounded-full bg-[#D5E4F5] px-2 py-0.5 text-xs font-semibold">
                    {m.state}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === 'tasks' && (
          <div id="co-panel-tasks" role="tabpanel" aria-labelledby="co-tab-tasks">
            <fieldset>
              <legend className="font-semibold">This week’s study tasks</legend>
              <ul className="mt-3 space-y-2" data-campus-tasks>
                {tasks.map((t) => (
                  <li key={t.id}>
                    <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-[#12315C]/10 bg-white px-4">
                      <input
                        type="checkbox"
                        checked={t.done}
                        onChange={() =>
                          setTasks((all) =>
                            all.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x)),
                          )
                        }
                        className="size-4 accent-[#12315C]"
                      />
                      <span className={t.done ? 'text-[#4a5f7d] line-through' : ''}>{t.label}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>
          </div>
        )}
        <p role="status" className="mt-3 min-h-5 text-sm text-[#12315C]">
          {notice}
        </p>
      </div>
    </div>
  );
}

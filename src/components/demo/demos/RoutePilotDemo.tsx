import { useState } from 'react';

/**
 * RoutePilot Logistics demo: sample dispatch board. Fictional; identifiers are obviously fake,
 * statuses are plain words, no ETAs, maps or tracking numbers.
 * Palette: graphite #2A3138, navy #1C2B3A, steel #E8EEF2, amber #E39B3A.
 */
type Lane = 'North' | 'East' | 'Yard';
type Status = 'Preparing' | 'Moving' | 'Arrived';
interface Job {
  id: string;
  lane: Lane;
  status: Status;
  load: string;
}

const STATUSES: Status[] = ['Preparing', 'Moving', 'Arrived'];
const LANES: Lane[] = ['North', 'East', 'Yard'];

const initial: Job[] = [
  { id: 'Sample job 01', lane: 'North', status: 'Preparing', load: '12 cartons, dry goods' },
  { id: 'Sample job 02', lane: 'North', status: 'Moving', load: '4 pallets, building materials' },
  { id: 'Sample job 03', lane: 'East', status: 'Preparing', load: '20 crates, drinks' },
  { id: 'Sample job 04', lane: 'East', status: 'Arrived', load: '2 pallets, office furniture' },
  { id: 'Sample job 05', lane: 'Yard', status: 'Moving', load: '1 container, transfer to bay 3' },
  { id: 'Sample job 06', lane: 'Yard', status: 'Preparing', load: '8 cartons, spare parts' },
];

const tone: Record<Status, string> = {
  Preparing: 'bg-[#E8EEF2] text-[#1C2B3A]',
  Moving: 'bg-[#E39B3A] text-[#1C2B3A]',
  Arrived: 'bg-[#2f6b4a] text-white',
};

const ring =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E39B3A]';

export default function RoutePilotDemo() {
  const [jobs, setJobs] = useState(initial);
  const [lane, setLane] = useState<Lane | 'All'>('All');
  const [log, setLog] = useState<string[]>([]);

  const shown = lane === 'All' ? jobs : jobs.filter((j) => j.lane === lane);

  const advance = (job: Job) => {
    const next = STATUSES[STATUSES.indexOf(job.status) + 1];
    if (!next) return;
    setJobs((all) => all.map((j) => (j.id === job.id ? { ...j, status: next } : j)));
    setLog((l) => [`${job.id}: ${job.status} → ${next}`, ...l].slice(0, 5));
  };

  const reset = () => {
    setJobs(initial);
    setLog([]);
  };

  return (
    <div className="bg-[#1C2B3A] font-sans text-[#E8EEF2]" data-routepilot>
      <header className="flex flex-wrap items-center justify-between gap-2 bg-[#2A3138] px-4 py-3 sm:px-6">
        <span className="font-semibold tracking-wide">
          Route<span className="text-[#E39B3A]">Pilot</span> · Dispatch
        </span>
        <span className="rounded border border-[#E39B3A]/60 px-2 py-0.5 text-xs text-[#E39B3A]">
          Sample data, not live shipments
        </span>
      </header>

      <div className="px-4 py-5 sm:px-6">
        <div role="group" aria-label="Filter by lane" className="flex flex-wrap gap-2" data-lanes>
          {(['All', ...LANES] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={lane === option}
              onClick={() => setLane(option)}
              className={`min-h-11 rounded-md border px-4 text-sm font-semibold ${ring} ${
                lane === option
                  ? 'border-[#E39B3A] bg-[#E39B3A] text-[#1C2B3A]'
                  : 'border-[#E8EEF2]/25 hover:border-[#E8EEF2]/60'
              }`}
            >
              {option}{' '}
              <span className="opacity-75">
                {option === 'All' ? jobs.length : jobs.filter((j) => j.lane === option).length}
              </span>
            </button>
          ))}
        </div>

        <div className="relative mt-5 overflow-x-auto rounded-lg border border-[#E8EEF2]/15">
          <table className="w-full min-w-[34rem] text-left text-sm" data-jobs>
            <caption className="sr-only">
              Sample jobs{lane !== 'All' ? ` in the ${lane} lane` : ''}
            </caption>
            <thead className="bg-[#2A3138] text-xs tracking-wide text-[#b7c3ce] uppercase">
              <tr>
                <th scope="col" className="px-3 py-2">
                  Job
                </th>
                <th scope="col" className="px-3 py-2">
                  Lane
                </th>
                <th scope="col" className="px-3 py-2">
                  Load
                </th>
                <th scope="col" className="px-3 py-2">
                  Status
                </th>
                <th scope="col" className="px-3 py-2">
                  <span className="sr-only">Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {shown.map((job) => {
                const next = STATUSES[STATUSES.indexOf(job.status) + 1];
                return (
                  <tr key={job.id} className="border-t border-[#E8EEF2]/10" data-job={job.id}>
                    <th scope="row" className="px-3 py-3 font-semibold">
                      {job.id}
                    </th>
                    <td className="px-3 py-3">{job.lane}</td>
                    <td className="px-3 py-3 text-[#c9d3dc]">{job.load}</td>
                    <td className="px-3 py-3">
                      <span
                        className={`rounded px-2 py-1 text-xs font-semibold ${tone[job.status]}`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right">
                      {next ? (
                        <button
                          type="button"
                          onClick={() => advance(job)}
                          className={`min-h-9 rounded-md border border-[#E8EEF2]/30 px-3 text-xs font-semibold hover:border-[#E39B3A] ${ring}`}
                        >
                          Mark {next.toLowerCase()}
                          <span className="sr-only">: {job.id}</span>
                        </button>
                      ) : (
                        <span className="text-xs text-[#b7c3ce]">Complete</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start">
          <section aria-labelledby="rp-log-title">
            <h2 id="rp-log-title" className="text-sm font-semibold">
              Activity
            </h2>
            <ol aria-live="polite" className="mt-2 space-y-1 text-sm text-[#c9d3dc]" data-activity>
              {log.length === 0 ? (
                <li>No changes yet.</li>
              ) : (
                log.map((l, i) => <li key={`${l}-${i}`}>{l}</li>)
              )}
            </ol>
          </section>
          <button
            type="button"
            onClick={reset}
            className={`min-h-11 rounded-md border border-[#E8EEF2]/25 px-4 text-sm font-semibold ${ring}`}
          >
            Reset sample board
          </button>
        </div>
      </div>
    </div>
  );
}

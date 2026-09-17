import type { JobStatus } from '../types'

type StatusFilterProps = {
  value: JobStatus | 'all'
  onChange: (newFilter: JobStatus | 'all') => void
}

function StatusFilter({
  value,
  onChange,
}: StatusFilterProps) {
  return (
    <div className='mt-4 flex flex-col gap-2'>
      <label
       className='text-sm font-medium text-slate-700'
       htmlFor="status-filter">
        Filter by status
      </label>

      <select
        className='rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none'
        id="status-filter"
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value as JobStatus | 'all',
          )
        }
      >
        <option value="all">All</option>
        <option value="saved">Saved</option>
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="rejected">Rejected</option>
        <option value="offer">Offer</option>
      </select>
    </div>
  )
}

export default StatusFilter
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
    <div>
      <label htmlFor="status-filter">
        Filter by status
      </label>

      <select
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
import type { Job, JobStatus } from '../types'

type JobCardProps = {
  job: Job
  onStatusChange: (jobId: string, newStatus: JobStatus) => void
  onDelete: (jobId: string) => void
}

function JobCard({
  job,
  onStatusChange,
  onDelete,
}: JobCardProps) {
  return (
    <article>
      <h3>{job.position}</h3>
      <p>{job.company}</p>
      {job.location && <p>{job.location}</p>}
      <p>Status: {job.status}</p>
      {job.notes && <p>{job.notes}</p>}

      <select
        value={job.status}
        onChange={(event) =>
          onStatusChange(
            job.id,
            event.target.value as JobStatus,
          )
        }
      >
        <option value="saved">Saved</option>
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="rejected">Rejected</option>
        <option value="offer">Offer</option>
      </select>

      <button
        type="button"
        onClick={() => onDelete(job.id)}
      >
        Delete
      </button>
    </article>
  )
}

export default JobCard
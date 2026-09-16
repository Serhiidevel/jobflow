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
    <article className='bg-white p-6 rounded-2xl shadow-sm mt-4'>
      <h3 className='text-lg font-semibold text-slate-900'>{job.position}</h3>
      <p className='mt-1 font-medium text-slate-700'>{job.company}</p>
      {job.location && <p className='mt-1 text-sm text-slate-500'>{job.location}</p>}
      <p className='mt-3 text-sm text-slate-600'>Status: {job.status}</p>
      {job.notes && <p className='mt-3 text-sm text-slate-600 whitespace-pre-wrap'>{job.notes}</p>}

      <select
        className='mt-4 rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
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
        className='ml-3 rounded-lg bg-red-600 px-4 py-2 text-white font-semibold hover:bg-red-700 cursor-pointer transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
        type="button"
        onClick={() => onDelete(job.id)}
      >
        Delete
      </button>
    </article>
  )
}

export default JobCard
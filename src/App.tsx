import { useState, type SubmitEvent } from 'react'
import type { Job, JobStatus } from './types'

function App() {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState<JobStatus>('saved')
  const [notes, setNotes] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const newJob: Job= {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      company,
      position,
      location,
      status,
      notes,
    }

    setJobs([...jobs, newJob])
    setCompany('')
    setPosition('')
    setLocation('')
    setStatus('saved')
    setNotes('')
  }

  function handleStatusChange(jobId: string, newStatus: JobStatus) {
    const updatedJobs: Job[] = jobs.map((job) => {
      if (job.id === jobId) {
        return {
          ...job,
          status: newStatus,
        }
      }

      return job
    })

    setJobs(updatedJobs)
  }
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <header>
          <h1 className="text-3xl font-bold text-slate-900">JobFlow</h1>
          <p className="mt-2 text-slate-600">Track your job applications in one place</p>
          <p>{jobs.length} applications tracked</p>
        </header>
        <section>
          <h2>Add job</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="company">Company</label>
            <input 
              id="company" 
              type="text" 
              value={company}
              onChange={(event) => setCompany(event.target.value)}
            />
            <label htmlFor="position">Position</label>
            <input
              id="position"
              type="text"
              value={position}
              onChange={(event) => setPosition(event.target.value)} 
            />
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
            <label htmlFor="status">Status</label>
              <select
                id="status"
                value={status}
                onChange={(event) => setStatus(event.target.value as JobStatus)}
              >
                <option value="saved">Saved</option>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="rejected">Rejected</option>
                <option value="offer">Offer</option>
              </select>
            <label htmlFor="notes">Notes</label>
            <textarea 
              id="notes"
              rows={4}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            ></textarea>
            <button type="submit">Add job</button>
          </form>
        </section>
        <section>
          <h2>Job applications</h2>

          {jobs.length === 0 && <p>No applications yet</p>}
          {jobs.map((job) => (
            <article key={job.id}>
              <h3>{job.position}</h3>
              <p>{job.company}</p>
              {job.location && <p>{job.location}</p>}
              <p>Status: {job.status}</p>
              {job.notes && <p>{job.notes}</p>}
              <select
                value={job.status}
                onChange={(event) =>
                  handleStatusChange(job.id, event.target.value as JobStatus)
                }
                >
                  <option value="saved">Saved</option>
                  <option value="applied">Applied</option>
                  <option value="interview">Interview</option>
                  <option value="rejected">Rejected</option>
                  <option value="offer">Offer</option>
                </select>
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}

export default App
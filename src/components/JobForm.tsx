import { useState, type SubmitEvent } from 'react'
import type { Job, JobStatus } from '../types'

type JobFormProps = {
  onAddJob: (newJob: Job) => void
}

function JobForm({ onAddJob }: JobFormProps) {
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [location, setLocation] = useState('')
  const [status, setStatus] =
    useState<JobStatus>('saved')
  const [notes, setNotes] = useState('')

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedCompany = company.trim()
    const trimmedPosition = position.trim()

    if (!trimmedCompany || !trimmedPosition) {
      return
    }

    const newJob: Job= {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      company: trimmedCompany,
      position: trimmedPosition,
      location: location.trim(),
      status,
      notes: notes.trim(),
    }

    onAddJob(newJob)
    setCompany('')
    setPosition('')
    setLocation('')
    setStatus('saved')
    setNotes('')
  }

  return (
     <section>
          <h2>Add job</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="company">Company</label>
            <input
              id="company"
              type="text"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              required
            />
            <label htmlFor="position">Position</label>
            <input
              id="position"
              type="text"
              value={position}
              onChange={(event) => setPosition(event.target.value)}
              required
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
  )
}

export default JobForm
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

    const newJob: Job = {
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
    <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Add job</h2>
      <form
        className="mt-6 flex flex-col gap-3"
        onSubmit={handleSubmit}>
        <label
          className="text-sm font-medium text-slate-700"
          htmlFor="company">Company</label>
        <input
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          id="company"
          type="text"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          required
        />
        <label
          className="text-sm font-medium text-slate-700"
          htmlFor="position">Position</label>
        <input
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          id="position"
          type="text"
          value={position}
          onChange={(event) => setPosition(event.target.value)}
          required
        />
        <label
          className="text-sm font-medium text-slate-700"
          htmlFor="location">Location</label>
        <input
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          id="location"
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
        <label
          className="text-sm font-medium text-slate-700"
          htmlFor="status">Status</label>
        <select
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
        <label
          className="text-sm font-medium text-slate-700"
          htmlFor="notes">Notes</label>
        <textarea
          className="resize-y rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          id="notes"
          rows={4}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        ></textarea>
        <button
          className="mt-3 cursor-pointer rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:bg-blue-800"
          type="submit">Add job</button>
      </form>
    </section>
  )
}

export default JobForm
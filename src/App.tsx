import JobCard from './components/JobCard'
import StatusFilter from './components/StatusFilter'
import { useEffect, useState } from 'react'
import type { Job, JobStatus } from './types'
import JobForm from './components/JobForm'

function App() {
  const [jobs, setJobs] = useState<Job[]>(() => {
    const storedJobs = localStorage.getItem('jobflow-jobs')

    return storedJobs
      ? (JSON.parse(storedJobs) as Job[])
      : []
  })



  const [statusFilter, setStatusFilter] = useState<JobStatus | 'all'>('all')
  useEffect(() => {
    localStorage.setItem('jobflow-jobs', JSON.stringify(jobs))
  }, [jobs])

  function handleAddJob(newJob: Job) {
    setJobs([...jobs, newJob])
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
  function handleDeleteJob(jobId: string) {
    const remainingJobs = jobs.filter((job) => job.id !== jobId)

    setJobs(remainingJobs)
  }

  const visibleJobs = statusFilter === 'all'
  ? jobs
  : jobs.filter((job) => job.status === statusFilter)
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <header>
          <h1 className="text-3xl font-bold text-slate-900">JobFlow</h1>
          <p className="mt-2 text-slate-600">Track your job applications in one place</p>
          <p>{jobs.length} applications tracked</p>
        </header>
        <JobForm onAddJob={handleAddJob} />
        <section>
          <h2>Job applications</h2>
          <StatusFilter
            value={statusFilter}
            onChange={setStatusFilter}
          />
          {visibleJobs.length === 0 && <p>No matching applications</p>}
          {visibleJobs.map((job) => (
            <JobCard
            key={job.id}
            job={job}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteJob}
          />
            
          ))}
        </section>
      </div>
    </main>
  )
}

export default App

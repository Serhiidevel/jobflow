export type JobStatus = 
   | 'saved'
   | 'applied'
   | 'interview'
   | 'rejected'
   | 'offer'


export type Job = {
    id: string
    company: string
    position: string
    location: string
    status: JobStatus
    notes: string
    createdAt: string
}
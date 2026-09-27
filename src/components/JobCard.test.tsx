import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import type { Job } from '../types'
import JobCard from './JobCard'

it('calls onStatusChange with the selected status', async() => {
    const user = userEvent.setup()

    const job: Job = {
        id: 'job-1',
        company: 'Google',
        position: 'Frontend developer',
        location: 'Bratislava',
        status: 'saved',
        notes: '',
        createdAt: '2026-09-23T10:00:00.000Z'
    } 

    const onStatusChange = vi.fn()
    const onDelete = vi.fn()

    render (
        <JobCard
        job={job}
        onStatusChange={onStatusChange}
        onDelete={onDelete}
        />,
    )
    
    await user.selectOptions(
        screen.getByRole('combobox'),
        'interview',
    )

    expect(onStatusChange).toHaveBeenCalledWith(
        'job-1',
        'interview',
    )
})

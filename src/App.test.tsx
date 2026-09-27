import '@testing-library/jest-dom/vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, it } from 'vitest'
import App from './App'
import type { Job } from './types'

afterEach(() => {
  cleanup()
  localStorage.clear()
})

it('filters jobs by status', async () => {
  const user = userEvent.setup()

  const jobs: Job[] = [
    {
      id: 'job-1',
      company: 'Google',
      position: 'Frontend Developer',
      location: 'Bratislava',
      status: 'applied',
      notes: '',
      createdAt: '2026-09-26T10:00:00.000Z',
    },
    {
      id: 'job-2',
      company: 'Spotify',
      position: 'React Developer',
      location: 'Remote',
      status: 'interview',
      notes: '',
      createdAt: '2026-09-26T11:00:00.000Z',
    },
  ]

  localStorage.setItem(
    'jobflow-jobs',
    JSON.stringify(jobs),
  )

  render(<App />)

  await user.selectOptions(
    screen.getByLabelText('Filter by status'),
    'interview',
  )

  expect(
    screen.queryByText('Frontend Developer'),
  ).not.toBeInTheDocument()

  expect(
    screen.getByText('React Developer'),
  ).toBeInTheDocument()
})

it('saves a newly added job to localStorage', async () => {
  const user = userEvent.setup()

  render(<App />)

  await user.type(
    screen.getByLabelText('Company'),
    'Google',
  )

  await user.type(
    screen.getByLabelText('Position'),
    'Frontend Developer',
  )

  await user.click(
    screen.getByRole('button', { name: 'Add job' }),
  )

  await waitFor(() => {
    const storedJobs = JSON.parse(
      localStorage.getItem('jobflow-jobs') ?? '[]',
    ) as Job[]

    expect(storedJobs).toHaveLength(1)

    expect(storedJobs[0]).toEqual(
      expect.objectContaining({
        company: 'Google',
        position: 'Frontend Developer',
        status: 'saved',
      }),
    )
  })
})

import '@testing-library/jest-dom/vitest'
import {cleanup, render, screen} from '@testing-library/react'
import JobForm from './JobForm'
import { afterEach, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

afterEach(() => {
    cleanup()
})

it('renders the main form controls', () => {
    const onAddJob = vi.fn()

    render(<JobForm onAddJob={onAddJob} />)

    expect(screen.getByLabelText('Company')).toBeInTheDocument()
    expect(screen.getByLabelText('Position')).toBeInTheDocument()
    expect(
        screen.getByRole('button', {name: 'Add job'}),
    ).toBeInTheDocument()
})

it('submits a new job', async () => {
    const user = userEvent.setup()
    const onAddJob = vi.fn()

    render(<JobForm onAddJob={onAddJob} />)

    await user.type(
        screen.getByLabelText('Company'),
        'Google',
    )
    await user.type(
        screen.getByLabelText('Position'),
        'Frontend Developer',
    )

    await user.click(
        screen.getByRole('button', {name:'Add job'}),
    )

    expect(onAddJob).toHaveBeenCalledTimes(1)

    expect(onAddJob).toHaveBeenCalledWith(
        expect.objectContaining({
            company: 'Google',
            position: 'Frontend Developer',
            status: 'saved',
        })
    )
})
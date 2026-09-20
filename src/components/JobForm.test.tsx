import '@testing-library/jest-dom/vitest'
import {render, screen} from '@testing-library/react'
import JobForm from './JobForm'
import { expect, it, vi } from 'vitest'

it('renders the main form controls', () => {
    const onAddJob = vi.fn()

    render(<JobForm onAddJob={onAddJob} />)

    expect(screen.getByLabelText('Company')).toBeInTheDocument()
    expect(screen.getByLabelText('Position')).toBeInTheDocument()
    expect(
        screen.getByRole('button', {name: 'Add job'}),
    ).toBeInTheDocument()
})
import React from 'react'

import { render } from '@testing-library/react'

import SharedSection from './section'

describe('Shared Section', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedSection />)
    expect(baseElement).toBeTruthy()
  })
})

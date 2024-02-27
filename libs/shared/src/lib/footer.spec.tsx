import React from 'react'

import { render } from '@testing-library/react'

import SharedFooter from './footer'

describe('Shared Footer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedFooter />)
    expect(baseElement).toBeTruthy()
  })
})

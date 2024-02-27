import React from 'react'

import { render } from '@testing-library/react'

import SharedHeader from './header'

describe('Shared Header', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedHeader />)
    expect(baseElement).toBeTruthy()
  })
})

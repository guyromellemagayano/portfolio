import React from 'react'

import { render } from '@testing-library/react'

import { SharedSection } from './SharedSection'

describe('<SharedSection />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedSection />)
    expect(baseElement).toBeTruthy()
  })
})

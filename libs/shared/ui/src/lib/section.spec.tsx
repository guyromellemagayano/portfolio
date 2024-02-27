import React from 'react'

import { render } from '@testing-library/react'

import SharedSectionUi from './section'

describe('SharedSectionUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedSectionUi />)
    expect(baseElement).toBeTruthy()
  })
})

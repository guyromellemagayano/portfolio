import React from 'react'

import { render } from '@testing-library/react'

import SharedFooterUi from './footer'

describe('SharedFooterUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedFooterUi />)
    expect(baseElement).toBeTruthy()
  })
})

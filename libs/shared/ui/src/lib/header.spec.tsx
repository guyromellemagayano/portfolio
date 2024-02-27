import React from 'react'

import { render } from '@testing-library/react'

import SharedHeaderUi from './header'

describe('SharedHeaderUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedHeaderUi />)
    expect(baseElement).toBeTruthy()
  })
})

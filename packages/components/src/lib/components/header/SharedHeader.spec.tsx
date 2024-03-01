import React from 'react'

import { render } from '@testing-library/react'

import { SharedHeader } from './SharedHeader'

describe('<SharedHeader />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedHeader />)
    expect(baseElement).toBeTruthy()
  })
})

import React from 'react'

import { render } from '@testing-library/react'

import { SharedLayout } from './SharedLayout'

describe('<SharedLayout />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedLayout />)
    expect(baseElement).toBeTruthy()
  })
})

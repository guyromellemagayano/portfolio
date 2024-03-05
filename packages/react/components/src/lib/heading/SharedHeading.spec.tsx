import React from 'react'

import { render } from '@testing-library/react'

import { SharedHeading } from './SharedHeading'

describe('<SharedHeading />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedHeading />)
    expect(baseElement).toBeTruthy()
  })
})

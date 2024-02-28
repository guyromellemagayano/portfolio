import React from 'react'

import { render } from '@testing-library/react'

import { SharedImage } from './SharedImage'

describe('<SharedImage />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedImage />)
    expect(baseElement).toBeTruthy()
  })
})

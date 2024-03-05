import React from 'react'

import { render } from '@testing-library/react'

import Shared from './Shared'

describe('<Shared />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Shared />)
    expect(baseElement).toBeTruthy()
  })
})

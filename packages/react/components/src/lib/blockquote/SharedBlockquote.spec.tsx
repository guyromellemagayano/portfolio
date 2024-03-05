import React from 'react'

import { render } from '@testing-library/react'

import { SharedBlockquote } from './SharedBlockquote'

describe('<SharedBlockquote />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedBlockquote />)
    expect(baseElement).toBeTruthy()
  })
})

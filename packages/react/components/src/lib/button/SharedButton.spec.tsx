import React from 'react'

import { render } from '@testing-library/react'

import { SharedButton } from './SharedButton'

describe('<SharedButton />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedButton />)
    expect(baseElement).toBeTruthy()
  })
})

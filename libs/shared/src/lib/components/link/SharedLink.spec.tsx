import React from 'react'

import { render } from '@testing-library/react'

import { SharedLink } from './SharedLink'

describe('<SharedLink />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedLink />)
    expect(baseElement).toBeTruthy()
  })
})

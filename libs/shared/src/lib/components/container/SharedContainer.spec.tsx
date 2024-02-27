import React from 'react'

import { render } from '@testing-library/react'

import { SharedContainer } from './SharedContainer'

describe('<SharedContainer />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedContainer />)
    expect(baseElement).toBeTruthy()
  })
})

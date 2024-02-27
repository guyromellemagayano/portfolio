import React from 'react'

import { render } from '@testing-library/react'

import { SharedMain } from './SharedMain'

describe('<SharedMain />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedMain />)
    expect(baseElement).toBeTruthy()
  })
})

import React from 'react'

import { render } from '@testing-library/react'

import { SharedList } from './SharedList'

describe('<SharedList />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedList />)
    expect(baseElement).toBeTruthy()
  })
})

import React from 'react'

import { render } from '@testing-library/react'

import { SharedNavigation } from './SharedNavigation'

describe('<SharedNavigation />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedNavigation />)
    expect(baseElement).toBeTruthy()
  })
})

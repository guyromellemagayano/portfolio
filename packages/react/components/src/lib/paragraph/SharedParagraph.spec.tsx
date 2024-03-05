import React from 'react'

import { render } from '@testing-library/react'

import { SharedParagraph } from './SharedParagraph'

describe('<SharedParagraph />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedParagraph />)
    expect(baseElement).toBeTruthy()
  })
})

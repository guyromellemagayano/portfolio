import React from 'react'

import { render } from '@testing-library/react'

import { SharedPreformattedText } from './SharedPreformattedText'

describe('<SharedPreformattedText />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedPreformattedText />)
    expect(baseElement).toBeTruthy()
  })
})

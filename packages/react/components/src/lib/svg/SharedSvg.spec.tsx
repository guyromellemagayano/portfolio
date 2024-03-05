import React from 'react'

import { render } from '@testing-library/react'

import { SharedSvgImage } from './SharedSvg'

describe('<SharedSvgImage />', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedSvgImage />)
    expect(baseElement).toBeTruthy()
  })
})

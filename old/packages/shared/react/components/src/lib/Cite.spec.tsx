import { render } from '@testing-library/react';

import Cite from './Cite';

describe('Cite', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Cite />);
    expect(baseElement).toBeTruthy();
  });
});

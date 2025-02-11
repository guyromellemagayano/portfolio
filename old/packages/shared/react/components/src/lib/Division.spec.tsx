import { render } from '@testing-library/react';

import Division from './Division';

describe('Division', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Division />);
    expect(baseElement).toBeTruthy();
  });
});

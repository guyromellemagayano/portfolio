import { render } from '@testing-library/react';

import Caption from './Caption';

describe('Caption', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Caption />);
    expect(baseElement).toBeTruthy();
  });
});

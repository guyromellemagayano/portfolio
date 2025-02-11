import { render } from '@testing-library/react';

import Figure from './Figure';

describe('Figure', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Figure />);
    expect(baseElement).toBeTruthy();
  });
});

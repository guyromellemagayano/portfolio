import { render } from '@testing-library/react';

import Area from './Area';

describe('Area', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Area />);
    expect(baseElement).toBeTruthy();
  });
});

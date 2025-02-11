import { render } from '@testing-library/react';

import BiDirectionalIsolation from './BiDirectionalIsolation';

describe('BiDirectionalIsolation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BiDirectionalIsolation />);
    expect(baseElement).toBeTruthy();
  });
});

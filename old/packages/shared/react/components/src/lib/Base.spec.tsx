import { render } from '@testing-library/react';

import Base from './Base';

describe('Base', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Base />);
    expect(baseElement).toBeTruthy();
  });
});

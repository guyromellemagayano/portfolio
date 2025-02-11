import { render } from '@testing-library/react';

import Canvas from './Canvas';

describe('Canvas', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Canvas />);
    expect(baseElement).toBeTruthy();
  });
});

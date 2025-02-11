import { render } from '@testing-library/react';

import Bold from './Bold';

describe('Bold', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Bold />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import Figcaption from './Figcaption';

describe('Figcaption', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Figcaption />);
    expect(baseElement).toBeTruthy();
  });
});

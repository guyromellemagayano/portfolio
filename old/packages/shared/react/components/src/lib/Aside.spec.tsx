import { render } from '@testing-library/react';

import Aside from './Aside';

describe('Aside', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Aside />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import HorizontalRule from './HorizontalRule';

describe('HorizontalRule', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HorizontalRule />);
    expect(baseElement).toBeTruthy();
  });
});

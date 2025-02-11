import { render } from '@testing-library/react';

import HeadingGroup from './HeadingGroup';

describe('HeadingGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HeadingGroup />);
    expect(baseElement).toBeTruthy();
  });
});

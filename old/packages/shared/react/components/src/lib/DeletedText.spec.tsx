import { render } from '@testing-library/react';

import DeletedText from './DeletedText';

describe('DeletedText', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DeletedText />);
    expect(baseElement).toBeTruthy();
  });
});

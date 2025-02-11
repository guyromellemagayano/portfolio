import { render } from '@testing-library/react';

import BiDirectionalOverride from './BiDirectionalOverride';

describe('BiDirectionalOverride', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BiDirectionalOverride />);
    expect(baseElement).toBeTruthy();
  });
});

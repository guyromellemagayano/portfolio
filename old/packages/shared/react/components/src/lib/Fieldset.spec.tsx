import { render } from '@testing-library/react';

import Fieldset from './Fieldset';

describe('Fieldset', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Fieldset />);
    expect(baseElement).toBeTruthy();
  });
});

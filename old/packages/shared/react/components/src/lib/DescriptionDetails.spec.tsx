import { render } from '@testing-library/react';

import DescriptionDetails from './DescriptionDetails';

describe('DescriptionDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DescriptionDetails />);
    expect(baseElement).toBeTruthy();
  });
});

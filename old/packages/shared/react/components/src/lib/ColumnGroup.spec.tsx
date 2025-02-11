import { render } from '@testing-library/react';

import ColumnGroup from './ColumnGroup';

describe('ColumnGroup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ColumnGroup />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import Datalist from './DataList';

describe('Datalist', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Datalist />);
    expect(baseElement).toBeTruthy();
  });
});

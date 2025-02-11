import { render } from '@testing-library/react';

import Article from './Article';

describe('Article', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Article />);
    expect(baseElement).toBeTruthy();
  });
});

import { render } from '@testing-library/react';

import DefinitionTerm from './DefinitionTerm';

describe('DefinitionTerm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DefinitionTerm />);
    expect(baseElement).toBeTruthy();
  });
});

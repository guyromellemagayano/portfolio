import { render } from '@testing-library/react';

import DefinitionElement from './DefinitionElement';

describe('DefinitionElement', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DefinitionElement />);
    expect(baseElement).toBeTruthy();
  });
});

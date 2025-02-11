import { render } from '@testing-library/react';

import DefinitionList from './DefinitionList';

describe('DefinitionList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DefinitionList />);
    expect(baseElement).toBeTruthy();
  });
});

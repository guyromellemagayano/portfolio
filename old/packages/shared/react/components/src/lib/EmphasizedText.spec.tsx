import { render } from '@testing-library/react';

import EmphasizedText from './EmphasizedText';

describe('EmphasizedText', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EmphasizedText />);
    expect(baseElement).toBeTruthy();
  });
});

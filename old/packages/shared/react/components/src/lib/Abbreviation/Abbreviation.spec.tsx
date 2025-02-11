import { createRef } from 'react';

import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Abbreviation from './Abbreviation';

describe('Abbreviation', () => {
  it('renders correctly with children', () => {
    render(<Abbreviation title="World Health Organization">WHO</Abbreviation>);

    const abbrElement = screen.getByText('WHO');
    expect(abbrElement).toBeInTheDocument(); // ✅ Works with Vitest now
    expect(abbrElement).toHaveAttribute('title', 'World Health Organization'); // ✅ Fixed
  });

  it('supports additional props like className', () => {
    render(<Abbreviation className="custom-class">HTML</Abbreviation>);

    const abbrElement = screen.getByText('HTML');
    expect(abbrElement).toHaveClass('custom-class'); // ✅ Fixed
  });

  it('forwards ref correctly', () => {
    const ref = createRef<HTMLElement>();

    render(<Abbreviation ref={ref}>Ref Test</Abbreviation>);

    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('ABBR');
  });
});

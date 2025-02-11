import { createRef } from 'react';

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import AddressClient from './Address.client';

describe('AddressClient', () => {
  it('renders correctly with children', () => {
    render(<AddressClient>123 Main St</AddressClient>);

    const addressElement = screen.getByText('123 Main St');
    expect(addressElement).toBeInTheDocument();
  });

  it('supports additional props like className and title', () => {
    render(
      <AddressClient className="custom-class" title="Address Title">
        456 Broadway
      </AddressClient>,
    );

    const addressElement = screen.getByText('456 Broadway');
    expect(addressElement).toHaveClass('custom-class');
    expect(addressElement).toHaveAttribute('title', 'Address Title');
  });

  it('forwards ref correctly', () => {
    const ref = createRef<HTMLElement>();

    render(<AddressClient ref={ref}>789 Elm St</AddressClient>);

    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName).toBe('ADDRESS');
  });
});

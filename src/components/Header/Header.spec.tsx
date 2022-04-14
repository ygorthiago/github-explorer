import { render } from '@testing-library/react';
import { Header } from '.';

describe('Header Component', () => {
  it('should be able to render Header component', () => {
    const headerComponent = render(<Header />);

    expect(headerComponent).toBeTruthy();
  });
});

import { render } from '@testing-library/react';
import { Loader } from '.';

describe('Loader Component', () => {
  it('should be able to render Loader component', () => {
    const loaderComponent = render(<Loader />);

    expect(loaderComponent).toBeTruthy();
  });
});

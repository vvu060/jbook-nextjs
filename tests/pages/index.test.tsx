import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import Home from '../../pages/index';

describe('Renders Home page', () => {
  it('should render home page', () => {
    render(<Home />);
  });
});

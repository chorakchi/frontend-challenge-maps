import React from 'react';
import { render } from '@testing-library/react';

import Header from '..';

it('should render the header with the correct title', () => {
  const { getByText } = render(<Header />);
  const titleElement = getByText(/Yelp Vimcar/i);

	expect(titleElement).toBeInTheDocument();
});

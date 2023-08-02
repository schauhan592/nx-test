import { render } from '@testing-library/react';

import NegativeGraph from './negative-graph';

describe('NegativeGraph', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NegativeGraph />);
    expect(baseElement).toBeTruthy();
  });
});

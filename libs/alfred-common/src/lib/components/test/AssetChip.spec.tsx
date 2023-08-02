import { render } from '@testing-library/react';
import AssetChip from '../AssetChip';
describe('AssetChip', () => {
  it('snapshot testing of AssetChip', () => {
    const domTree = render(<AssetChip name="test" symbol="test" size="sm" />);
    expect(domTree).toMatchSnapshot();
  });
});

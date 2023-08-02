import { render, screen } from '@testing-library/react';

import FilterBar from '../FilterBar';

jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: (...props: any) => {
    const dynamicModule = jest.requireActual('next/dynamic');
    const dynamicActualComp = dynamicModule.default;
    const RequiredComponent = dynamicActualComp(props[0]);
    RequiredComponent.preload ? RequiredComponent.preload() : RequiredComponent.render.preload();
    return RequiredComponent;
  },
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    query: { page: 1, per_page: 10 },
    asPath: '/explore',
  })),
}));

describe('FilterBar', () => {
  it('should render successfully for NFT ', () => {
    const props = {
      fromNft: true,
      fromCollection: false,
      searchplaceHolder: 'search nft',
      refetch: () => null,
      searchHandler: (e: any) => null,
      FilterClickHandler: () => null,
      searchValue: 'na',
      filterState: true,
    };
    const { baseElement, asFragment, getByText } = render(<FilterBar {...props} />);
    const button = screen.getByTestId('filter-btn');
    expect(button).toBeTruthy();
    expect(baseElement).toBeTruthy();
  });
  it('should render successfully for collection ', () => {
    const props = {
      fromNft: false,
      fromCollection: true,
      searchplaceHolder: 'search collections',
      refetch: () => null,
      searchHandler: (e: any) => null,
      FilterClickHandler: () => null,
      searchValue: 'na',
      filterState: true,
    };
    const { baseElement, asFragment, getByText } = render(<FilterBar {...props} />);
    const dropdown = screen.getByTestId('select-chain-dropdown');
    expect(dropdown).toBeTruthy();
    expect(baseElement).toBeTruthy();
  });
});

import {
  FilterButtons,
  FilterCheckBoxs,
  MultiCheckbox,
  TraitsCheckBoxs,
  TraitsMultiCheckbox,
} from '../FilterCheckBoxs';
import { render } from '@testing-library/react';

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

describe('FilterCheckBoxs', () => {
  it('should render successfully ', () => {
    const props = {
      title: 'test',
      options: [{ name: 'test', label: 'test' }],
      expanded: true,
      handleCheck: () => null,
    };
    const { baseElement } = render(<FilterCheckBoxs {...props} />);
    expect(baseElement).toBeTruthy();
  });
});

describe('TraitsCheckBoxs', () => {
  it('should render successfully ', () => {
    const props = {
      title: 'test',
      options: [{ value: 'test', count: 1 }],
      expanded: true,
      handleCheck: (group: string, name: string, item: boolean) => null,
    };
    const { baseElement } = render(<TraitsCheckBoxs {...props} />);
    expect(baseElement).toBeTruthy();
  });
});
describe('FilterButtons', () => {
  it('should render successfully ', () => {
    const props = {
      title: 'test',
      options: [{ name: 'test', id: 'test' }],
      expanded: true,
      handleClick: (type: string, item: string) => null,
    };
    const { baseElement } = render(<FilterButtons {...props} />);
    expect(baseElement).toBeTruthy();
  });
});
describe('MultiCheckbox', () => {
  it('should render successfully ', () => {
    const props = {
      options: [{ name: 'test', label: 'test' }],
      handleCheck: () => null,
    };
    const { baseElement } = render(<MultiCheckbox {...props} />);
    expect(baseElement).toBeTruthy();
  });
});
describe('TraitsMultiCheckbox', () => {
  it('should render successfully ', () => {
    const props = {
      title: 'test',
      options: [{ count: 2, value: 'test' }],
      handleCheck: () => null,
    };
    const { baseElement } = render(<TraitsMultiCheckbox {...props} />);
    expect(baseElement).toBeTruthy();
  });
});

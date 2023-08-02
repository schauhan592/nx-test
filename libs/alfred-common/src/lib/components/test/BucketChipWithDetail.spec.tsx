import { render } from '@testing-library/react';
import BucketChipWithPool from '../BucketChipWithDetails';
import { Snackbar } from '@mui/material';
describe('BucketChipWithDetails', () => {
  it('snapshot testing of BucketChipWithDetails', () => {
    const domTree = render(
      <Snackbar>
        <BucketChipWithPool
          max={2}
          tokens={[
            {
              id: '',
              symbol: '',
              decimals: '',
              decimal: '',
              image: '',
              address: '',
              risk: {
                isRisk: false,
                title: '',
                title_tag_color: '',
                title_tag_label: '',
                cards: [{ title: '', title_tag_color: '', body_markdown: '' }],
              },
            },
          ]}
          size="sm"
          id=""
          valueA=""
          valueB=""
          handleRemoveSelection={jest.fn()}
          handleEdit={() => {}}
        />
      </Snackbar>
    );
    expect(domTree).toMatchSnapshot();
  });
});

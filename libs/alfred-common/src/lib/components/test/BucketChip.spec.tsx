import { render } from '@testing-library/react';
import BucketChip from '../BucketChip';
import { Snackbar } from '@mui/material';
describe('BucketChip', () => {
  it('snapshot testing of BucketChip', () => {
    const domTree = render(
      <Snackbar>
        <BucketChip
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
        />
      </Snackbar>
    );
    expect(domTree).toMatchSnapshot();
  });
});

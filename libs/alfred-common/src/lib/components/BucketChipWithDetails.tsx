import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import BucketChips, { BucketChipProps } from './BucketChip';
import { styled } from '@mui/material/styles';

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  height: 16,
  width: 16,
}));

interface BucketChipWithPoolProps extends BucketChipProps {
  id: string;
  valueA: string;
  valueB: string;
  handleRemoveSelection(id: string): void;
  handleEdit(id: string): void;
}

export default function BucketChipWithPool({
  valueA,
  valueB,
  id,
  max,
  tokens,
  handleRemoveSelection,
  handleEdit,
}: BucketChipWithPoolProps) {
  function removeItem() {
    handleRemoveSelection(id);
  }

  function editItem() {
    handleEdit(id);
  }

  return (
    <Stack
      direction="row"
      spacing={3}
      justifyContent="space-between"
      alignItems="flex-start"
      sx={{
        backgroundColor: 'background.default',
        p: 1,
        borderRadius: 1,
        border: '1px solid',
        minWidth: 160,
      }}
    >
      <BucketChips max={max} tokens={tokens} size="lg" layout="v" />
      <Stack direction="column" spacing={1} alignItems="start" data-testid="test1">
        <CustomIconButton onClick={editItem} disableRipple data-testid="edit_item_button">
          <EditIcon sx={{ height: 16, width: 16 }} />
        </CustomIconButton>
        <CustomIconButton onClick={removeItem} disableRipple data-testid="remove_item_button">
          <DeleteOutlineIcon sx={{ color: 'red', height: 16, width: 16 }} />
        </CustomIconButton>
      </Stack>
    </Stack>
  );
}

import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { BoxProps } from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

interface QuickSearchToolbarProps extends BoxProps {
  setSearchWord: React.Dispatch<React.SetStateAction<string>>;
  searchWord: string;
  placeholder: string;
}
const SearchInput = styled(TextField)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiTextField-input': {
    fontSize: 16,
    color: theme.palette.text.secondary,
  },
}));

export default function QuickSearchToolbar({
  searchWord,
  setSearchWord,
  placeholder = 'Search...',
  ...others
}: QuickSearchToolbarProps) {
  const { sx } = others;
  const [showClearIcon, setShowClearIcon] = useState<string>('none');

  function handleSearch(_e: any) {
    setShowClearIcon(_e?.target.value === '' ? 'none' : 'flex');
    setSearchWord(_e?.target?.value);
  }

  function handleWipe() {
    setSearchWord('');
    setShowClearIcon('none');
  }

  return (
    <Stack
      direction="column"
      spacing={2}
      component="form"
      sx={{
        p: 0.5,
        pb: 0,
        ...sx,
      }}
    >
      <FormControl variant="standard">
        <SearchInput
          variant="outlined"
          value={searchWord}
          onChange={handleSearch}
          placeholder={placeholder}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
                style={{ display: showClearIcon }}
                onClick={handleWipe}
              >
                <ClearIcon
                  sx={{ color: 'text.secondary', cursor: 'pointer' }}
                  onClick={handleWipe}
                />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
    </Stack>
  );
}

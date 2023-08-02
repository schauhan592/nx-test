import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';

// ----------------------------------------------------------------------

export default function SearchBar({
  value,
  onchangeHandler,
  placeholder,
  name,
}: {
  name: string;
  value: string;
  onchangeHandler: (e: any) => void;
  placeholder: string;
}) {
  return (
    <TextField
      fullWidth
      name={name}
      value={value}
      onChange={onchangeHandler}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

import { useState } from 'react';

// next
// @mui
import { styled } from '@mui/material/styles';
import { Autocomplete, InputAdornment, Link, Popper, PopperProps, Typography } from '@mui/material';
// hooks
// components
import Image from './Image';
import Iconify from './Iconify';
import InputStyle from './InputStyle';
import SearchNotFound from './SearchNotFound';

// ----------------------------------------------------------------------

const PopperStyle = styled((props: PopperProps) => (
  <Popper
    nonce={undefined}
    onResize={undefined}
    onResizeCapture={undefined}
    placement="bottom-start"
    {...props}
  />
))({
  width: '280px !important',
});

// ----------------------------------------------------------------------

export default function SuggestionSearchBar({
  handleChangeSearch,
  searchOptions,
  handleClick,
  placeholder,
  value,
}: {
  handleChangeSearch: any;
  searchOptions: { name: string; image: string; id: any }[];
  handleClick: any;
  placeholder: string;
  value: any;
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearchQuery((event.target as HTMLInputElement).value);
      handleClick({ value: (event.target as HTMLInputElement).value });
    }
  };

  return (
    <Autocomplete
      size="small"
      autoHighlight
      popupIcon={null}
      value={value}
      PopperComponent={PopperStyle}
      options={searchOptions}
      onInputChange={(event, value) => handleChangeSearch(value)}
      getOptionLabel={(product: any) => product.name}
      noOptionsText={<SearchNotFound searchQuery={searchQuery} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <InputStyle
          {...params}
          stretchStart={200}
          placeholder={placeholder}
          onKeyUp={handleKeyUp}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon={'eva:search-fill'}
                  sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }}
                />
              </InputAdornment>
            ),
          }}
        />
      )}
      // eslint-disable-next-line unused-imports/no-unused-vars
      renderOption={(props, item, { inputValue }) => {
        const { name, image } = item;
        return (
          <Link underline="none" onClick={() => handleClick({ value: item })}>
            <li {...props}>
              <Image
                alt={name}
                src={image}
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 1,
                  flexShrink: 0,
                  mr: 1.5,
                }}
              />

              <Typography component="span" variant="subtitle2" color={'primary'}>
                {name}
              </Typography>
            </li>
          </Link>
        );
      }}
    />
  );
}

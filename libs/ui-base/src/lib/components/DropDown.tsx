import {
  Avatar,
  Box,
  Button,
  Input,
  MenuItem,
  MenuList,
  Popover,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';
import { Props as ScrollbarProps } from 'simplebar-react';

import NextLink from 'next/link';
import React, { MutableRefObject, useState } from 'react';
import Image from './Image';

interface Props extends ScrollbarProps {
  sx?: SxProps;
  children?: React.ReactNode;
}

export default function DropDown({
  options,
  showSearch,
  handleChangeOption,
  dialogOpen,
  handleCloseDialog,
  anchorRef,
  showButton,
  placeholder,
  route,
  buttonText,
  sx,
}: {
  options: { id: string; name: string; image?: string; logo?: string }[];
  showSearch?: boolean;
  handleChangeOption: (a: any, b: any) => void;
  dialogOpen: boolean;
  handleCloseDialog: VoidFunction;
  anchorRef: MutableRefObject<HTMLInputElement>;
  showButton?: boolean;
  placeholder?: string;
  route?: string;
  buttonText?: string;
  sx?: any;
}): React.ReactElement {
  const [filtered, setFiltered] = useState<any>(null);

  const handleClose = () => {
    handleCloseDialog();
    setFiltered(options);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredArray = options?.filter((option) => {
      return option.name.startsWith(e.target.value);
    });
    setFiltered(filteredArray);
  };
  return (
    <Popover
      open={dialogOpen}
      onClose={handleClose}
      anchorEl={anchorRef.current}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      sx={{ width: 350, maxHeight: 300, ...sx }}
    >
      {showSearch && (
        <Input
          id="input-with-icon-adornment"
          placeholder={placeholder}
          sx={{ ml: 2, mr: 2, mt: 2, mb: 2 }}
          onChange={handleChange}
        />
      )}

      <MenuList>
        {(filtered ? filtered : options)?.map((option: any) => (
          <MenuItem
            key={option?.id}
            value={option?.name}
            onClick={(e) => {
              handleChangeOption(e, option);
              handleClose();
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} sx={{ paddingRight: 2.5 }}>
              {option?.image ? (
                <Avatar alt={option?.name} sx={{ background: 'inherit' }}>
                  <Image src={option?.image} width={30} height={30} alt={option?.name} />
                </Avatar>
              ) : (
                ''
              )}
              <div>
                <Typography variant="subtitle1">{option?.name}</Typography>
              </div>
            </Stack>
          </MenuItem>
        ))}
      </MenuList>

      {showButton && (
        <Box m={1}>
          <NextLink href={route as any}>
            <Button variant="text" sx={{ width: '100%', marginTop: 1 }}>
              {buttonText}
            </Button>
          </NextLink>
        </Box>
      )}
    </Popover>
  );
}

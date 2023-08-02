import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Badge, Box, Button, Stack } from '@mui/material';
import Iconify from './Iconify';
import DropDown from './DropDown';
import useResponsive from '../hooks/useResponsive';
import SearchBar from './SearchBar';
import { useRouter } from 'next/router';
import React, { memo, MutableRefObject, useRef, useState } from 'react';
import { ChainOptions } from '../utils/constants';
import { getFilterCount, getFilters } from '../utils/filterUtils';

export default memo(function FilterBar({
  searchHandler,
  FilterClickHandler,
  filterState,
  refetch,
  fromCollection,
  searchValue,
  searchplaceHolder,
  fromNft,
  from,
  ...others
}: {
  from: string;

  fromNft?: boolean;
  fromCollection?: boolean;
  searchplaceHolder: string;
  refetch: () => void;
  searchHandler: (e: any) => void;
  FilterClickHandler?: () => void;
  searchValue: string;
  filterState?: boolean;
}) {
  const router = useRouter();
  const filters = getFilters(router.query, 'nft');
  const filtercount = getFilterCount(filters);
  const [dialog, setDialogOpen] = useState({ chainDialog: false, currencyDialog: false });
  const [chainName, setchainName] = useState((router.query['blockchain'] as string) || 'ETHEREUM');
  const handleDialog = () => {
    setDialogOpen((state) => ({ ...state, chainDialog: true }));
  };
  const isMobile = useResponsive('down', 'lg');
  const anchorRef = useRef<HTMLInputElement>(null);

  const handleCheck = (name: string, value: boolean | string) => {
    if (value) {
      router.push(
        {
          query: { ...router.query, [name]: value },
        },
        undefined,
        { shallow: true }
      );
    } else {
      delete router.query[name];
      router.replace({ query: router.query }, undefined, { shallow: true });
    }
  };

  const handleChangeSorting = (event: React.ChangeEvent, op: any) => {
    setchainName(op.id);
    handleCheck('blockchain', op.id);
  };
  const handleCloseChainDialog = () => {
    setDialogOpen((state) => ({ ...state, chainDialog: false }));
  };
  const Searchbar = (
    <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1, width: '100%' }}>
      <SearchBar
        value={searchValue}
        name="NFT"
        placeholder={searchplaceHolder}
        onchangeHandler={searchHandler}
      />
    </Stack>
  );
  return (
    <Box sx={{ width: '100%' }}>
      <Stack {...others} sx={{ width: '100%' }}>
        <Stack
          spacing={2}
          display="flex"
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-around"
          sx={{ my: 2, width: '100%' }}
        >
          <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none', ml: 2 } }}>
            <Stack>{isMobile ? Searchbar : ''}</Stack>
          </Box>
          <Stack
            direction={{ xs: 'row', sm: 'row', md: 'row' }}
            sx={{
              ml: 0,
              mr: 2,
              '&': {
                marginLeft: '0px',
              },
              width: '100%',
              alignItems: 'center',
            }}
          >
            {fromNft ? (
              <Stack spacing={1}>
                <Box ml={0} mr={1}>
                  <Badge
                    badgeContent={filtercount}
                    sx={{
                      '& span': {
                        width: '25px',
                        height: '25px',
                        borderRadius: '40%',
                        fontSize: '1.1rem',
                      },
                    }}
                    invisible={false}
                    color="primary"
                  >
                    <Button
                      sx={{ padding: 2, mr: 1 }}
                      disableRipple
                      variant="outlined"
                      size="medium"
                      startIcon={
                        <Iconify
                          width={22}
                          height={22}
                          icon={filterState ? 'ic:outline-less-than' : 'carbon:settings-adjust'}
                        />
                      }
                      onClick={FilterClickHandler}
                    >
                      {isMobile ? '' : 'Filters'}
                    </Button>
                  </Badge>
                </Box>
              </Stack>
            ) : (
              ''
            )}
            <Stack>
              <Button
                disableRipple
                variant="outlined"
                size="medium"
                sx={{ padding: 2, mr: 1 }}
                onClick={() => refetch()}
              >
                <Iconify width={22} height={22} icon={'charm:refresh'} />
              </Button>
            </Stack>
            <Stack flexGrow={5} sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
              {!isMobile ? Searchbar : ''}
            </Stack>
            {fromCollection ? (
              <Stack direction="row" spacing={1} flexShrink={0}>
                <Box display="inline-block">
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      position: 'relative',
                      ml: 1,
                    }}
                    ref={anchorRef}
                  >
                    <Button
                      onClick={handleDialog}
                      variant="outlined"
                      size="large"
                      sx={{ padding: 3.5 }}
                      endIcon={!dialog.chainDialog ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                    >
                      {chainName}
                    </Button>
                  </Box>
                  <Box>
                    <DropDown
                      anchorRef={anchorRef as MutableRefObject<HTMLInputElement>}
                      options={ChainOptions}
                      dialogOpen={dialog.chainDialog}
                      handleCloseDialog={handleCloseChainDialog}
                      handleChangeOption={handleChangeSorting}
                    />
                  </Box>
                </Box>
              </Stack>
            ) : (
              ''
            )}
            {/* TODO: will be added once we will get this filter in be */}
            {/* {fromNft ? (
              <Stack direction="row" spacing={1} flexShrink={0}>
                <Box display="inline-block">
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      position: 'relative',
                      ml: 1,
                    }}
                    ref={anchorRef}
                  >
                    <Button
                      onClick={handleDialog}
                      variant="outlined"
                      size="large"
                      sx={{ padding: 3.5 }}
                      endIcon={!dialog.chainDialog ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                    >
                      {selectedSort?.name}
                    </Button>
                  </Box>
                  <Box>
                    <DropDown
                      anchorRef={anchorRef as MutableRefObject<HTMLInputElement>}
                      options={sortOptions}
                      dialogOpen={dialog.chainDialog}
                      handleCloseDialog={handleCloseChainDialog}
                      handleChangeOption={handleChangeChain}
                    />
                  </Box>
                </Box>
              </Stack>
            ) : (
              ''
            )} */}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
});

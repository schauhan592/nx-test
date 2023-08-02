import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { NextImage } from '@sdf/base';
import { ReactNode } from 'react';
import { asset_landing } from '../../public/assets';
import StrategyHeader from '../StrategyPageLayout/StrategyHeader';

export default function LandingPageLayout({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ position: 'relative', height: '100vh' }}>
      <StrategyHeader />
      <Container sx={{ my: 16 }} maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item lg={4}>
            <Card sx={{ minHeight: 700, zIndex: 500 }}>
              <CardContent>
                <Stack direction="column" spacing={3}>
                  <Stack
                    position="relative"
                    height={300}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <NextImage
                      height={300}
                      width={300}
                      src={asset_landing}
                      alt="landing-page-defi"
                    />
                  </Stack>

                  <Stack direction="column" spacing={4} sx={{ pt: 4 }}>
                    <Typography variant="h3">Demistify DeFi</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Alfred is a non-custodial, 100% trustless platform that makes investing in
                      DeFi safe and insanely easy.
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={8} sx={{ zIndex: 500 }}>
            {children}
          </Grid>
        </Grid>
      </Container>

      {/* <Box sx={{ position: 'absolute', bottom: 100, left: 60 }}>
        <NextImage src={line} alt="backgournd-line" />
      </Box> */}
    </Box>
  );
}

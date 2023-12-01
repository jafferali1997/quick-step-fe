'use client';

import { Box, Button, Grid, Typography } from '@mui/material';
import useVerificationExpire from './use-verification-expire.hook';

export default function VerificationExpire() {
  const { resendLinkHandler } = useVerificationExpire();
  return (
    <Grid
      container
      item
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Grid
        item
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          px: 5,
          pb: 3,
          mt: 3,
          border: '1px solid #D6D6D6',
          borderRadius: '20px',
          bgcolor: '#EFF6FF'
        }}
        xs={10}
        md={8}
        lg={6.3}
      >
        <div className="image">
          <img alt="img" src="/assets/images/expire.png" />
        </div>
        <Typography
          sx={{
            fontSize: '22px',
            fontWeight: '500',
            lineHeight: '33px',
            color: '#2C2E3E',
            my: 2,
            textAlign: 'center'
          }}
        >
          Verification link Expired
        </Typography>
        <Typography sx={{ textAlign: 'center', fontSize: '14px', color: '#46474F' }}>
          Hi, there your magics link has been expired, beacuse you have not used it. Magic
          link expired every 24 hours and can only be used once. You can click on this
          button and create new one.
        </Typography>
        <Button
          sx={{
            fontSize: '14px',
            textTransform: 'inherit',
            my: 5,
            bgcolor: '#1D4ED8 !important',
            py: 1
          }}
          type="button"
          onClick={resendLinkHandler}
          variant="contained"
        >
          Request Another Link
        </Button>
        <Typography sx={{ display: 'flex', color: '#46474F', fontSize: '12px' }}>
          If you have an issues.
          <Typography sx={{ color: '#1E40AF', fontSize: '12px', fontWeight: 500 }}>
            Let us know
          </Typography>
        </Typography>
      </Grid>
    </Grid>
  );
}

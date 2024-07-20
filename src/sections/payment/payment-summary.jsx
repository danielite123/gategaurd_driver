import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function PaymentSummary(props) {
  const { sx, ...other } = props;

  return (
    <Box
      sx={{
        p: 5,
        borderRadius: 2,
        bgcolor: 'background.neutral',
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h6" sx={{ mb: 5 }}>
        Summary
      </Typography>

      <Stack spacing={2.5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            From
          </Typography>

          <Label color="success">Ibadan</Label>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            To
          </Typography>

          <Label color="success">Lagos</Label>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Distance
          </Typography>

          <Label color="success">1km</Label>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">Total Billed</Typography>

          <Typography variant="subtitle1">#200</Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
      </Stack>

      <Button fullWidth size="large" variant="contained" sx={{ mt: 5, mb: 3 }}>
        Order
      </Button>
    </Box>
  );
}

PaymentSummary.propTypes = {
  sx: PropTypes.object,
};

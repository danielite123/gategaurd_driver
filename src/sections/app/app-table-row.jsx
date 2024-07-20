/* eslint-disable no-shadow */
import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

export default function AppTableRow({
  selected,
  id,
  from,
  to,
  price,
  status,
  distance,
  duration,
  handleClick,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox" />
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {from}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{to}</TableCell>
        <TableCell>#{price}</TableCell>
        <TableCell>
          <Label color={(status === 'banned' && 'error') || 'success'}>{status}</Label>
        </TableCell>
        <TableCell>{distance}</TableCell>
        <TableCell>{duration}</TableCell>
      </TableRow>{' '}
    </>
  );
}

AppTableRow.propTypes = {
  to: PropTypes.any,
  handleClick: PropTypes.func,
  id: PropTypes.any,
  from: PropTypes.any,
  price: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
  distance: PropTypes.string,
  duration: PropTypes.string,
};

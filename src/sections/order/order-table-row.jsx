/* eslint-disable no-shadow */
import axios from 'axios';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

export default function OrderTableRow({
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
  const navigate = useNavigate();

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleAcceptOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `https://gateguard-backend.onrender.com/order/accept/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle success, maybe update UI or show a notification
      console.log('Order accepted successfully:', response.data);
      toast.success('Order accepted successfully!');

      // Navigate to the order view page after accepting the order
      navigate('/'); // Replace with your actual order view route
    } catch (error) {
      // Handle error, show error message or retry logic
      console.error('Error accepting order:', error);
      toast.error('Failed to accept order. Please try again later.');
    } finally {
      handleCloseMenu(); // Close the popover after action
    }
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
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleAcceptOrder}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2, color: 'success.main' }} />
          Accept
        </MenuItem>
      </Popover>
    </>
  );
}

OrderTableRow.propTypes = {
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

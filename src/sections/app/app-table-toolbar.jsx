import PropTypes from 'prop-types';

import Toolbar from '@mui/material/Toolbar';
// ----------------------------------------------------------------------

export default function AppTableToolbar({ numSelected, filterName, onFilterName }) {
  return (
    <Toolbar
      sx={{
        height: 12,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {' '}
    </Toolbar>
  );
}

AppTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

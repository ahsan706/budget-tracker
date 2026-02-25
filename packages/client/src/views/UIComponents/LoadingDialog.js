import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';
export default function LoadingDialog(props) {
  return (
    <Dialog open={props.open} PaperComponent="div">
      <CircularProgress color="secondary" />
    </Dialog>
  );
}
LoadingDialog.propTypes = {
  open: PropTypes.bool
};

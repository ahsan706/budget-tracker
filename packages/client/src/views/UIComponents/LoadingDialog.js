import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
const LoadingDialog = (props) => {
  return (
    <Dialog open={props.open} PaperComponent="div">
      <CircularProgress color="secondary" />
    </Dialog>
  );
};
LoadingDialog.propTypes = {
  open: PropTypes.bool
};
export default LoadingDialog;

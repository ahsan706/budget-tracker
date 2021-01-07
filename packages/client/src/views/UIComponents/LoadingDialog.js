import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
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

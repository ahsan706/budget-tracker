import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
const InformationDialog = (props) => {
  return (
    <Dialog open={props.open}>
      <DialogContent>
        <DialogContentText>{props.dialogText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};
InformationDialog.propTypes = {
  open: PropTypes.bool,
  dialogText: PropTypes.string,
  onClose: PropTypes.func
};
export default InformationDialog;

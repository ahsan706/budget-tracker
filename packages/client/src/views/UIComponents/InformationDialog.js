import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import PropTypes from 'prop-types';

import useTranslation from '../../utils/translation';
export default function InformationDialog(props) {
  const { t } = useTranslation();
  return (
    <Dialog open={props.open}>
      <DialogContent>
        <DialogContentText>{props.dialogText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary" autoFocus>
          {t('Common.ok')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
InformationDialog.propTypes = {
  open: PropTypes.bool,
  dialogText: PropTypes.string,
  onClose: PropTypes.func
};

import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
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

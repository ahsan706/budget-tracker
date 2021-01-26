import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AttachMoney from '@material-ui/icons/AttachMoney';
import LanguageIcon from '@material-ui/icons/Language';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import PropTypes from 'prop-types';

import useTranslation from '../../../utils/translation';
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));
export default function Header(props) {
  const { logout } = useAuth0();
  const classes = useStyles();
  const { t, i18n, ready } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const onChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    handleClose();
  };
  const openChangeLanguagePopOver = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const openLogOutClicked = (event) => {
    logout();
    props.history.replace('/');
  };
  const handleClose = () => {
    setAnchorEl(undefined);
  };
  return (
    <AppBar position="relative" component="div">
      <Toolbar>
        <AttachMoney />
        <Typography variant="h6" color="inherit" noWrap className={classes.title}>
          {ready ? t('App.Header.title') : null}
        </Typography>

        <IconButton onClick={(event) => openChangeLanguagePopOver(event)}>
          <LanguageIcon style={{ color: 'white' }} />
        </IconButton>
        <IconButton onClick={(event) => openLogOutClicked(event)}>
          <PowerSettingsNewIcon style={{ color: 'white' }} />
        </IconButton>
      </Toolbar>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}>
        <List>
          <ListItem>
            <Button onClick={() => onChangeLanguage('en')}>English</Button>
          </ListItem>
          <ListItem>
            <Button onClick={() => onChangeLanguage('sv')}>Swedish</Button>
          </ListItem>
        </List>
      </Popover>
    </AppBar>
  );
}
Header.propTypes = {
  history: PropTypes.any
};

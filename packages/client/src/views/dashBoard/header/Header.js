import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import AttachMoney from '@mui/icons-material/AttachMoney';
import LanguageIcon from '@mui/icons-material/Language';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Popover from '@mui/material/Popover';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import useTranslation from '../../../utils/translation';

export default function Header(props) {
  const { logout } = useAuth0();
  const { t, i18n } = useTranslation();
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
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          {t('App.Header.title')}
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
        }}
      >
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

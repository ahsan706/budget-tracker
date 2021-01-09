import React from 'react';

import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, ready } = useTranslation('translation', { useSuspense: false });
  const Copyright = () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://m-ahsan.com">
          {ready ? t('App.Footer.footer') : null}
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  };
  return (
    <React.Fragment>
      {' '}
      <Typography variant="h6" align="center" gutterBottom>
        {ready ? t('App.Footer.your-website') : null}
      </Typography>
      <Copyright />
    </React.Fragment>
  );
};
export default Footer;

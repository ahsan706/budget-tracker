import React from 'react';

import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import useTranslation from '../../utils/translation';
export default function CopyRight() {
  const { t, ready } = useTranslation();
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
}

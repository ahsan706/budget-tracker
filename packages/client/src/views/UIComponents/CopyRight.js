import React from 'react';

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import useTranslation from '../../utils/translation';
export default function CopyRight() {
  const { t } = useTranslation();
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'CopyRight © '}
      <Link color="inherit" href="https://m-ahsan.com">
        {t('App.Footer.footer')}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

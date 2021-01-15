import React from 'react';

import Typography from '@material-ui/core/Typography';

import useTranslation from '../../../utils/translation';
import CopyRight from '../../UIComponents/CopyRight';
export default function Footer() {
  const { t, ready } = useTranslation();

  return (
    <React.Fragment>
      <Typography variant="h6" align="center" gutterBottom>
        {ready ? t('App.Footer.your-website') : null}
      </Typography>
      <CopyRight />
    </React.Fragment>
  );
}

import React from 'react';

import Typography from '@material-ui/core/Typography';

import useTranslation from '../../../utils/translation';
import CopyRight from '../../UIComponents/CopyRight';
export default function Footer() {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Typography variant="h6" align="center" gutterBottom>
        {t('App.Footer.your-website')}
      </Typography>
      <CopyRight />
    </React.Fragment>
  );
}

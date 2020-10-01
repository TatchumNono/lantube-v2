import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useTranslation } from 'react-i18next';

const Copyright = () => {
  const { t } = useTranslation()
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {t('copyright')+'©'}
      <Link
        color="inherit"
        target="_BLANK"
        href="https://github.com/TatchumNono/lantube-v2">
        Lantube-v2
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'} <br />
      Open Source
    </Typography>
  );
};

export default Copyright;

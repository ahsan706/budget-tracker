import React from 'react';

import Home from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function PageNotFound() {
  return (
    <Paper
      sx={{ bgcolor: 'background.default', margin: 0, height: 'calc(100vh - 64px)' }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%'
        }}
      >
        <Typography variant="h4">404</Typography>
        <Typography variant="subtitle1">Page not found</Typography>
        <Button
          color="secondary"
          aria-label="home"
          href="/"
          sx={{ marginTop: '20px' }}
        >
          <Home />
        </Button>
      </div>
    </Paper>
  );
}

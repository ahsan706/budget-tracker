import { useAuth0 } from '@auth0/auth0-react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Navigate, useLocation } from 'react-router-dom';

import useTranslation from '../../utils/translation';
import LoadingDialog from '../UIComponents/LoadingDialog';

export default function Login() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const { t } = useTranslation();
  const location = useLocation();

  const onSignInClicked = (event) => {
    event.preventDefault();
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.origin + '/login'
      },
      appState: location.state
    });
  };

  return isLoading ? (
    <LoadingDialog open={true} />
  ) : isAuthenticated ? (
    <Navigate to={location.state?.redirectTo ?? '/'} replace />
  ) : (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        size={{ sm: 4, md: 7 }}
        sx={{
          display: { xs: 'none', sm: 'block' },
          backgroundImage: 'url(https://picsum.photos/800/1200)',
          backgroundRepeat: 'no-repeat',
          bgcolor: (theme) =>
            theme.palette.mode === 'light' ? 'grey.50' : 'grey.900',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <Grid size={{ xs: 12, sm: 8, md: 5 }} component={Paper} elevation={6} square>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100vh',
            justifyContent: 'center'
          }}
        >
          <Avatar sx={{ margin: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('App.Login.AuthenticateText')}
          </Typography>
          <form noValidate>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ margin: (theme) => theme.spacing(3, 0, 2) }}
              onClick={onSignInClicked}
            >
              {t('App.Login.Authenticate')}
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

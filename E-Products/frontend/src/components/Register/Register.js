import React, { useState } from 'react'
import '../../assests/ind.css'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/Actions/Users/useraction';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../Displaytext/Errormessage';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit">
        E-Products
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


const Register = () => {
  const { t, i18n } = useTranslation();
  i18n.changeLanguage()
  
  const [userName, setusername] = useState('');
  const [userEmail, setemail] = useState('');
  const [userPassword, setpassword] = useState('');

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo, error } = userLogin;
  const history = useNavigate();
  const dispatch = useDispatch();
  const formSubmitHandler = e => {
    e.preventDefault();
    dispatch(registerUser(userName, userEmail,userPassword));
    console.log(userInfo);
    if (userInfo !== null && error === undefined)
       history('/signin');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          {error && <ErrorMessage error={error} />}
          <Typography component="h1" variant="h5">
            {t("signup.signup")}
          </Typography>
          <Box component="form" onSubmit={formSubmitHandler} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label= {t("signup.username")}
              value={userName}
              onChange={e => setusername(e.target.value)}
              name="name"
              autoComplete="name"
              autoFocus
              required
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t("signin.email_address")}
              value={userEmail}
              onChange={e => setemail(e.target.value)}
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t("signin.password")}
              value={userPassword}
              onChange={e => setpassword(e.target.value)}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {t("product.register")}
            </Button>
            <Grid container>
              <Grid item>
                <Link href='/signin'variant="body2">
                  {t("signup.do_account")}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Register;
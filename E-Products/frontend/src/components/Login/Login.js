import React,{useState,useEffect} from 'react'
// import '../../assests/ind.css'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/Actions/Users/useraction';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../Displaytext/Errormessage';
import Loading from '../Loading/Loading'
import {Link} from 'react-router-dom'



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

const Login = () => {
  const { t, i18n } = useTranslation();
   i18n.changeLanguage()
  
  const [userEmail, setemail] = useState('');
  const [userPassword, setpassword] = useState('');
  const dispatch = useDispatch();
  const history = useNavigate();

  const userLoginDetails = useSelector(state => state.userLogin);
  const {loading, userInfo, error } = userLoginDetails;
  console.log(userInfo, error);

  useEffect(() => {
    if (userInfo) {
      history('/');
    }
  }, [dispatch, userInfo, history]);

  //submit form
  const submitFormHandler = e => {
    e.preventDefault();
    dispatch(loginUser(userEmail, userPassword));
    console.log(userEmail, userPassword);
  };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            
            <LockOpenOutlinedIcon/>
          </Avatar>
          {loading && <Loading />}
          {error && <ErrorMessage error={error} />}
          <Typography component="h1" variant="h5">
            {t('signin.signin')}
          </Typography>
                  <Box component="form" onSubmit={submitFormHandler} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t('signin.email_address')}
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
              label={t('signin.password')}
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
              {t('signin.signin')}
            </Button>
            <Grid container>
              <Grid item>
                <Link to='signup'>
                 {t('signin.dont_account')}
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

export default Login;
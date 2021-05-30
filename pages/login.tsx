import { useQuery } from '@apollo/client';
import { Button, Card, CardContent, Grid, TextField, Typography } from '@material-ui/core';
import Link from 'next/link';
import Router, { NextRouter } from 'next/router';
import React, { useState } from 'react';

import { IMeQuery, ME_QUERY } from '../src/data/queries/me-query';
import { validateNewUser } from '../src/data/validation/user';
import {
  getErrorMessageForLoginErrorCode,
  UserLoginErrorCode,
} from '../src/helpers/user-login-error-code';
import { withDataAndRouter } from '../src/helpers/with-data';
import { BlankLayout } from '../src/layouts/blank-layout';

export interface ILoginPageProps {
  router?: NextRouter;
}

function LoginPage(props: ILoginPageProps): JSX.Element {
  const { data } = useQuery<IMeQuery>(ME_QUERY);

  const { router } = props;

  const routerQuery = router!.query as { how: UserLoginErrorCode; goto: string };
  const message = routerQuery.how ? getErrorMessageForLoginErrorCode(routerQuery.how) : undefined;

  const [loginId, setLoginId] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [registerId, setRegisterId] = useState<string>('');
  const [registerPassword, setRegisterPassword] = useState<string>('');
  const [validationMessage, setValidationMessage] = useState<string>('');

  const [login, setLogin] = useState(true)

  const validateLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    if (data?.me) {
      e.preventDefault();
      Router.push('/login?how=loggedin');
    } else {
      try {
        validateNewUser({ id: loginId, password: loginPassword });
      } catch (err) {
        e.preventDefault();
        setValidationMessage(err.message);
      }
    }
  };

  const validateRegister = (e: React.FormEvent<HTMLFormElement>): void => {
    if (data?.me) {
      e.preventDefault();
      Router.push('/login?how=loggedin');
    } else {
      try {
        validateNewUser({ id: registerId, password: registerPassword });
      } catch (err) {
        e.preventDefault();
        setValidationMessage(err.message);
      }
    }
  };

  return (
    <BlankLayout>
      <Card variant="outlined" style={{ margin: 'auto', marginTop: 10, maxWidth: 400 }}>
        <CardContent>
          {message && <p>{message}</p>}
          {validationMessage && <p>{validationMessage}</p>}
          {login && <form
            method="post"
            action="/login"
            onSubmit={(e): void => validateLogin(e)}
            style={{ marginBottom: '1em' }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5">
                  Login
                </Typography>
              </Grid>
              <input type="hidden" name="goto" value={routerQuery.goto || 'news'} />
              <Grid item xs={12}>
                <TextField
                  autoCapitalize="off"
                  autoCorrect="off"
                  name="id"
                  onChange={(e): void => setLoginId(e.target.value)}
                  fullWidth
                  spellCheck={false}
                  type="text"
                  label="Username"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  name="password"
                  onChange={(e): void => setLoginPassword(e.target.value)}
                  variant="outlined"
                  label="Password"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" color="primary" variant="contained" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'white' }} fullWidth>Login</Button>
              </Grid>
              <Grid item xs={12}>
                <Button color="primary" variant="outlined" style={{ fontSize: '0.8rem', fontWeight: 600 }} fullWidth onClick={() => setLogin(false)}>Sign Up</Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption">
                  <Link href="/forgot">
                    Forgot your password?
                </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>}
          {!login && <form
            method="post"
            action="/register"
            onSubmit={(e): void => validateRegister(e)}
            style={{ marginBottom: '1em' }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5">
                  Create Account
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="id"
                  onChange={(e): void => setRegisterId(e.target.value)}
                  autoCorrect="off"
                  spellCheck={false}
                  autoCapitalize="off"
                  label="Username"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  name="password"
                  onChange={(e): void => setRegisterPassword(e.target.value)}
                  label="Password"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" color="primary" variant="contained" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'white' }} fullWidth>Sign up</Button>
              </Grid>
              <Grid item xs={12}>
                <Button color="primary" variant="outlined" style={{ fontSize: '0.8rem', fontWeight: 600 }} fullWidth onClick={() => setLogin(true)}>Login</Button>
              </Grid>
            </Grid>
          </form>}
        </CardContent>
      </Card>
    </BlankLayout>
  );
}

export default withDataAndRouter(LoginPage);

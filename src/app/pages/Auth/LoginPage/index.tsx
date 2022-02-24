import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link as RouterLink } from 'react-router-dom';
import { getAuthCookie } from 'utils/cookies';
import { useTranslation } from 'react-i18next';

import { getLoginIsLoading, getLoginError, getResetPasswordStatus } from '../store/selectors';
import { clearAuthContext, login } from '../store/actions';

import { Link } from '@material-ui/core';
import PrimaryButton from 'app/components/PrimaryButton';
import PrimaryTextField from 'app/components/PrimaryTextField';
import PasswordTextField from 'app/components/PasswordTextField';
import FormAlert from 'app/components/FormAlert';
import { AuthCard, AuthHeader } from '../components/AuthCard';
import { lang } from 'locales/translations';

export function LoginPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const loginError = useSelector(getLoginError);
  const isLoggingIn = useSelector(getLoginIsLoading);
  const resetPasswordStatus = useSelector(getResetPasswordStatus);
  const authToken = useSelector(getAuthCookie);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    return () => {
      dispatch(clearAuthContext());
    };
  }, [dispatch]);

  const handleLogin = event => {
    event.preventDefault();
    dispatch(login({ username, password }));
  };

  return !!authToken ? (
    <Redirect to={'/organizations'} />
  ) : (
    <AuthCard>
      <AuthHeader text={t(lang.login.header)} />
      {!!loginError ? (
        <FormAlert severity={'error'}>
          {loginError.status === 401
            ? t(lang.login.alert.incorrect_credentials)
            : loginError.status === 403
            ? t(lang.login.alert.account_locked)
            : t(lang.alert.general_error)}
        </FormAlert>
      ) : !!resetPasswordStatus ? (
        <FormAlert severity={'success'}>{t(lang.login.alert.password_updated)}</FormAlert>
      ) : null}
      <form onSubmit={handleLogin}>
        <PrimaryTextField
          id={'username'}
          label={t(lang.label.username)}
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
        <PasswordTextField
          id={'password'}
          label={t(lang.label.password)}
          value={password}
          onChange={event => setPassword(event.target.value)}
          autoFill
        />
        <div style={{ marginTop: '15px' }}>
          <Link variant={'body2'} component={RouterLink} to={'/request-reset'}>
            {t(lang.login.forgot_password_link)}
          </Link>
        </div>
        <div style={{ marginTop: '15px' }}>
          <PrimaryButton
            id={'submit'}
            type={'submit'}
            disabled={isLoggingIn || !username || !password}
            fullWidth
          >
            {t(lang.login.submit_button)}
          </PrimaryButton>
        </div>
      </form>
    </AuthCard>
  );
}

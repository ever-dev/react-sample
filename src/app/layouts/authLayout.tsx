import React from 'react';
import { AuthBg } from '../pages/Auth/components/AuthBg';
import { useDispatch } from 'react-redux';
import { getAuthCookie } from '../../utils/cookies';
import { logout } from '../pages/Auth/store/actions';
import { ReactComponent as AuthBanner } from 'assets/banner.svg';
import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    authContainer: {
      position: 'absolute',
      width: '100%',
      left: '0',
      top: '15vh',
    },
    authBanner: {
      position: 'relative',
      margin: '0 auto',
      width: '300px',
    },
    authContent: {
      position: 'relative',
      marginTop: '25px',
    },
  }),
);

export function AuthLayout({ children }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const authCookie = getAuthCookie();

  React.useEffect(
    () => {
      if (!!authCookie) {
        dispatch(logout(authCookie));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <>
      <AuthBg />
      <div className={classes.authContainer}>
        <div className={classes.authBanner}>
          <AuthBanner />
        </div>
        <div className={classes.authContent}>{children}</div>
      </div>
    </>
  );
}

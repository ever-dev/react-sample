import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getAuthCookie } from 'utils/cookies';
import { useSelector } from 'react-redux';

export function PrivateRoute({ children, ...props }) {
  const authCookie = useSelector(getAuthCookie);

  return (
    <Route {...props} children={() => (!!authCookie ? children : <Redirect to={'/login'} />)} />
  );
}

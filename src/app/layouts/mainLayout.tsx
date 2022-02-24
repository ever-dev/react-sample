import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setAuthHeader } from 'utils/axiosUtils';
import { getAuthCookie } from 'utils/cookies';
import { fetchCountries } from '../store/actions';
import { fetchUserSession } from '../pages/Auth/store/actions';
import { getLoginUser } from '../pages/Auth/store/selectors';

import NavigationBar from '../components/NavigationBar';
import PrimaryBreadcrumbs from '../components/PrimaryBreadcrumbs';

export function MainLayout({ children }) {
  const dispatch = useDispatch();
  const authCookie = getAuthCookie();
  const loginUser = useSelector(getLoginUser);
  React.useEffect(
    () => {
      if (!!authCookie) {
        setAuthHeader(authCookie);
        if (!loginUser) {
          dispatch(fetchUserSession());
        }
        dispatch(fetchCountries());
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return (
    <>
      <NavigationBar />
      <PrimaryBreadcrumbs />
      {children}
    </>
  );
}

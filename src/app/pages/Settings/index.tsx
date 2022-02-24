import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getLoginUser } from '../Auth/store/selectors';
import {
  clearSettingsContext,
  clearUserPasswordContext,
  updateSettings,
  updateUserPassword,
} from './store/actions';
import { UserPassword, UserSettings } from './store/types';

import PrimaryContainer from 'app/components/PrimaryContainer';
import SideNavigation from 'app/components/SideNavigation';
import BasicSettingsView from './components/BasicSettingsView';
import PasswordSettingsView from './components/PasswordSettingsView';
import { PanelColumn, PanelContentRow, TabPanel } from 'app/components/PrimaryPanel';
import { lang } from 'locales/translations';

export function SettingsPage() {
  const dispatch = useDispatch();
  const user = useSelector(getLoginUser);
  const { t } = useTranslation();
  let { path, url } = useRouteMatch();

  useEffect(() => {
    return () => {
      dispatch(clearSettingsContext());
      dispatch(clearUserPasswordContext());
    };
  }, [dispatch]);

  const handleUpdateSettings = (payload: UserSettings) => {
    dispatch(updateSettings(payload));
  };

  const handleUpdateUserPassword = (payload: UserPassword) => {
    dispatch(updateUserPassword(payload));
  };

  return !!user ? (
    <PrimaryContainer>
      <SideNavigation
        ariaLabel={'Account settings navigation'}
        tabs={[{ label: t(lang.navbar.settings), route: `${url}` }]}
      />
      <Switch>
        <Route
          path={`${path}`}
          exact
          render={() => (
            <TabPanel id={'account_settings_panel'}>
              <PanelContentRow>
                <PanelColumn>
                  <BasicSettingsView user={user} updateSettings={handleUpdateSettings} />
                </PanelColumn>
                <PanelColumn>
                  <PasswordSettingsView user={user} updateUserPassword={handleUpdateUserPassword} />
                </PanelColumn>
              </PanelContentRow>
            </TabPanel>
          )}
        />
      </Switch>
    </PrimaryContainer>
  ) : null;
}

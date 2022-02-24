import * as React from 'react';
import { useEffect } from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  clearOrganizationContext,
  fetchOrganization,
  updateOrganization,
} from '../Organizations/store/actions';
import {
  getOrganizationData,
  getOrganizationError,
  getOrganizationLoading,
} from '../Organizations/store/selectors';
import { ApiError } from 'store/types';
import { Organization, OrganizationProfiles } from '../Organizations/store/types';

import { Typography } from '@material-ui/core';
import ServerError from 'app/components/ServerError';
import SideNavigation from 'app/components/SideNavigation';
import PrimaryContainer from 'app/components/PrimaryContainer';
import { PanelLoading, TabPanel } from 'app/components/PrimaryPanel';
import OrganizationDetailsView from './components/DetailsView';
import OrganizationProfilesView from './components/ProfilesView';
import OrganizationAirlinesView from './components/AirlinesView';
import OrganizationUsersView from './components/UsersView';
import { lang } from 'locales/translations';

export function OrganizationSettingsPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const urlParams: { id: string } = useParams();
  const orgId = parseInt(urlParams.id);
  let { path, url } = useRouteMatch();

  const orgData: Organization | undefined = useSelector(getOrganizationData);
  const orgError: ApiError | undefined = useSelector(getOrganizationError);
  const orgLoading: boolean = useSelector(getOrganizationLoading);

  useEffect(() => {
    dispatch(fetchOrganization(orgId));
    return () => {
      dispatch(clearOrganizationContext());
    };
  }, [orgId, dispatch]);

  const handleUpdateOrganization = (data: Organization) => {
    dispatch(updateOrganization(data));
  };

  const handleUpdateProfiles = (profiles: OrganizationProfiles[]) => {
    if (orgData) {
      const data = { ...orgData, profiles: profiles };
      dispatch(updateOrganization(data));
    }
  };

  return (
    <PrimaryContainer>
      <SideNavigation
        ariaLabel={'Organization settings navigation'}
        tabs={[
          {
            label: t(lang.organizations.details_tabs.details),
            route: `${url}`,
          },
          {
            label: t(lang.organizations.details_tabs.profiles),
            route: `${url}/profiles`,
          },
          {
            label: t(lang.organizations.details_tabs.users),
            route: `${url}/users`,
          },
          {
            label: t(lang.organizations.details_tabs.airlines),
            route: `${url}/airlines`,
          },
          {
            label: t(lang.organizations.details_tabs.contacts),
            route: `${url}/contacts`,
          },
          {
            label: t(lang.organizations.details_tabs.cartage),
            route: `${url}/cartage`,
          },
          {
            label: t(lang.organizations.details_tabs.alerts),
            route: `${url}/alerts`,
          },
        ]}
      />
      <Switch>
        <Route
          path={path}
          exact
          render={() => (
            <TabPanel id={'organization_details_panel'}>
              {orgLoading ? (
                <PanelLoading text={t(lang.organizations.details_tabs.details)} />
              ) : null}
              {!!orgError ? (
                <PrimaryContainer>
                  <ServerError
                    loading={orgLoading}
                    retry={() => {
                      dispatch(fetchOrganization(orgId));
                    }}
                  />
                </PrimaryContainer>
              ) : null}
              {!!orgData ? (
                <OrganizationDetailsView
                  organization={orgData}
                  updateDetails={handleUpdateOrganization}
                />
              ) : null}
            </TabPanel>
          )}
        />
        <Route
          path={`${path}/profiles`}
          render={() => (
            <TabPanel id={'organization_profiles_panel'}>
              {orgLoading ? (
                <PanelLoading text={t(lang.organizations.details_tabs.profiles)} />
              ) : null}
              {!!orgError ? (
                <PrimaryContainer>
                  <ServerError
                    loading={orgLoading}
                    retry={() => {
                      dispatch(fetchOrganization(orgId));
                    }}
                  />
                </PrimaryContainer>
              ) : null}
              {!!orgData ? (
                <OrganizationProfilesView
                  profiles={orgData.profiles}
                  updateProfiles={handleUpdateProfiles}
                />
              ) : null}
            </TabPanel>
          )}
        />
        <Route
          path={`${path}/users`}
          render={() => (
            <TabPanel id={'organization_users_panel'}>
              <OrganizationUsersView orgId={orgId} />
            </TabPanel>
          )}
        />
        <Route
          path={`${path}/airlines`}
          render={() => (
            <TabPanel id={'organization_airlines_panel'}>
              <OrganizationAirlinesView orgId={orgId} />
            </TabPanel>
          )}
        />
        <Route
          path={`${path}/contacts`}
          render={() => (
            <TabPanel id={'organization_contact_panel'}>
              <Typography component={'h1'} variant={'h5'}>
                {t(lang.organizations.details_tabs.contacts)}
              </Typography>
            </TabPanel>
          )}
        />
        <Route
          path={`${path}/cartage`}
          render={() => (
            <TabPanel id={'organization_cartage_panel'}>
              <Typography component={'h1'} variant={'h5'}>
                {t(lang.organizations.details_tabs.cartage)}
              </Typography>
            </TabPanel>
          )}
        />
        <Route
          path={`${path}/alerts`}
          render={() => (
            <TabPanel id={'organization_alerts_panel'}>
              <Typography component={'h1'} variant={'h5'}>
                {t(lang.organizations.details_tabs.alerts)}
              </Typography>
            </TabPanel>
          )}
        />
      </Switch>
    </PrimaryContainer>
  );
}

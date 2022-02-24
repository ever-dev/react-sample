import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  updateOrganizationError,
  updateOrganizationLoading,
  updateOrganizationStatus,
} from '../../../Organizations/store/selectors';
import { OrganizationProfiles } from '../../../Organizations/store/types';

import { Checkbox, FormControl, FormControlLabel, FormGroup } from '@material-ui/core';
import PrimaryAlert from 'app/components/PrimaryAlert';
import ProfileChip from 'app/components/ProfileChip';
import PrimaryButton from 'app/components/PrimaryButton';
import {
  PanelHeader,
  PanelHeaderRow,
  PanelHeaderContent,
  PanelContentRow,
  PanelFooterRow,
} from 'app/components/PrimaryPanel';
import { lang } from 'locales/translations';

interface OrganizationProfilesProps {
  profiles: OrganizationProfiles[];
  updateProfiles: (data: OrganizationProfiles[]) => void;
}

export default function OrganizationProfilesView(props: OrganizationProfilesProps) {
  const { t } = useTranslation();
  const profiles = props.profiles;

  const updateStatus = useSelector(updateOrganizationStatus);
  const updateError = useSelector(updateOrganizationError);
  const updateLoading = useSelector(updateOrganizationLoading);

  const [admin, setAdmin] = useState<boolean>(profiles.includes('admin'));
  const [shipper, setShipper] = useState<boolean>(profiles.includes('shipper'));
  const [ratePartner, setRatePartner] = useState<boolean>(profiles.includes('ratepartner'));
  const [cartage, setCartage] = useState<boolean>(profiles.includes('cartage'));
  const [demo, setDemo] = useState<boolean>(profiles.includes('demo'));

  const [profilesChanged, setProfilesChanged] = useState<boolean>(false);

  React.useEffect(() => {
    if (
      profiles.includes('admin') !== admin ||
      profiles.includes('shipper') !== shipper ||
      profiles.includes('ratepartner') !== ratePartner ||
      profiles.includes('cartage') !== cartage ||
      profiles.includes('demo') !== demo
    ) {
      setProfilesChanged(true);
    } else {
      setProfilesChanged(false);
    }
  }, [admin, shipper, ratePartner, cartage, demo, profiles]);

  const handleResetProfiles = () => {
    setAdmin(profiles.includes('admin'));
    setShipper(profiles.includes('shipper'));
    setRatePartner(profiles.includes('ratepartner'));
    setCartage(profiles.includes('cartage'));
    setDemo(profiles.includes('demo'));
  };

  const handleUpdateProfiles = () => {
    const updatedProfiles: OrganizationProfiles[] = [];
    if (admin) updatedProfiles.push('admin');
    if (shipper) updatedProfiles.push('shipper');
    if (ratePartner) updatedProfiles.push('ratepartner');
    if (cartage) updatedProfiles.push('cartage');
    if (demo) updatedProfiles.push('demo');
    props.updateProfiles(updatedProfiles);
  };

  return (
    <>
      <PrimaryAlert severity={'error'} open={!!updateError}>
        {t(lang.alert.general_error)}
      </PrimaryAlert>
      <PrimaryAlert severity={'success'} open={!!updateStatus}>
        {t(lang.settings.alert.settings_updated)}
      </PrimaryAlert>
      <PanelHeaderRow>
        <PanelHeader
          text={t(lang.organizations.details_tabs.profiles)}
          style={{ flex: '1 1 auto' }}
        />
        <PanelHeaderContent style={{ flex: '1 1 100%', marginLeft: '16px' }}>
          {admin ? <ProfileChip id={'admin_profile'} profile={'admin'} /> : null}
          {shipper ? <ProfileChip id={'shipper_profile'} profile={'shipper'} /> : null}
          {ratePartner ? <ProfileChip id={'ratepartner_profile'} profile={'ratepartner'} /> : null}
          {cartage ? <ProfileChip id={'cartage_profile'} profile={'cartage'} /> : null}
          {demo ? <ProfileChip id={'demo_profile'} profile={'demo'} /> : null}
        </PanelHeaderContent>
      </PanelHeaderRow>
      <PanelContentRow>
        <FormControl component={'fieldset'}>
          <FormGroup style={{ height: '130px', marginTop: '8px' }}>
            <FormControlLabel
              control={
                <Checkbox
                  id={'admin_profile'}
                  name={'admin'}
                  color={'primary'}
                  checked={admin}
                  disabled={updateLoading}
                  onChange={d => setAdmin(d.currentTarget.checked)}
                />
              }
              label={t(lang.organizations.profiles.admin)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  id={'shipper_profile'}
                  name={'shipper'}
                  color={'primary'}
                  checked={shipper}
                  disabled={updateLoading}
                  onChange={d => setShipper(d.currentTarget.checked)}
                />
              }
              label={t(lang.organizations.profiles.shipper)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  id={'ratepartner_profile'}
                  name={'ratePartner'}
                  color={'primary'}
                  checked={ratePartner}
                  disabled={updateLoading}
                  onChange={d => setRatePartner(d.currentTarget.checked)}
                />
              }
              label={t(lang.organizations.profiles.ratepartner)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  id={'cartage_profile'}
                  name={'cartage'}
                  color={'primary'}
                  checked={cartage}
                  disabled={updateLoading}
                  onChange={d => setCartage(d.currentTarget.checked)}
                />
              }
              label={t(lang.organizations.profiles.cartage)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  id={'demo_profile'}
                  name={'demo'}
                  color={'primary'}
                  checked={demo}
                  disabled={updateLoading}
                  onChange={d => setDemo(d.currentTarget.checked)}
                />
              }
              label={t(lang.organizations.profiles.demo)}
            />
          </FormGroup>
        </FormControl>
      </PanelContentRow>
      <PanelFooterRow>
        <PrimaryButton
          id={'update_profiles'}
          onClick={handleUpdateProfiles}
          disabled={!profilesChanged || updateLoading}
        >
          {t(lang.action.update)}
        </PrimaryButton>
        {profilesChanged ? (
          <PrimaryButton
            id={'reset_profiles'}
            variant={'outlined'}
            onClick={handleResetProfiles}
            disabled={updateLoading}
          >
            {t(lang.action.cancel)}
          </PrimaryButton>
        ) : null}
      </PanelFooterRow>
    </>
  );
}

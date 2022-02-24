import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormState } from 'utils/useFormState';

import {
  getSettingsError,
  getSettingsLoading,
  getSettingsStatus,
} from 'app/pages/Settings/store/selectors';
import { User } from 'app/pages/Auth/store/types';
import { UserSettings } from 'app/pages/Settings/store/types';

import PrimaryTextField from 'app/components/PrimaryTextField';
import PhoneTextField from 'app/components/PhoneTextField';
import PrimaryAlert from 'app/components/PrimaryAlert';
import PrimaryButton from 'app/components/PrimaryButton';
import {
  PanelHeader,
  PanelHeaderRow,
  PanelFooterRow,
  PanelContentRow,
} from 'app/components/PrimaryPanel';
import { lang } from 'locales/translations';

interface BasicSettingsProps {
  user: User;
  updateSettings: (userSettings: UserSettings) => void;
}

export default function BasicSettingsView({ user, updateSettings }: BasicSettingsProps) {
  const { t } = useTranslation();

  const updateStatus = useSelector(getSettingsStatus);
  const updateError = useSelector(getSettingsError);
  const updateLoading = useSelector(getSettingsLoading);

  const [username, setUsername, usernameChanged] = useFormState(user.username);
  const [name, setName, nameChanged] = useFormState(user.name);
  const [email, setEmail, emailChanged] = useFormState(user.email);
  const [phone, setPhone, phoneChanged] = useFormState(user.phone);
  const [basicsChanged, setBasicsChanged] = useState<boolean>(false);

  React.useEffect(() => {
    const basicsChanged = usernameChanged || nameChanged || emailChanged || phoneChanged;
    setBasicsChanged(basicsChanged);
  }, [usernameChanged, nameChanged, emailChanged, phoneChanged]);

  const handleResetSettings = () => {
    setUsername(user.username);
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
  };

  const handleUpdateSettings = useCallback(() => {
    const updatedAccount: UserSettings = {
      ...user,
      name: name,
      email: email,
      phone: phone,
    };
    updateSettings(updatedAccount);
  }, [name, email, phone, user, updateSettings]);

  return (
    <>
      <PrimaryAlert severity={'error'} open={!!updateError}>
        {t(lang.alert.general_error)}
      </PrimaryAlert>
      <PrimaryAlert severity={'success'} open={!!updateStatus}>
        {t(lang.settings.alert.settings_updated)}
      </PrimaryAlert>
      <PanelHeaderRow>
        <PanelHeader text={t(lang.settings.basic_information)} />
      </PanelHeaderRow>
      <PanelContentRow>
        <PrimaryTextField
          disabled
          id={'username'}
          label={t(lang.label.username)}
          value={username}
          valid={usernameChanged || undefined}
          onChange={event => setUsername(event.target.value)}
        />
        <PrimaryTextField
          id={'name'}
          label={t(lang.label.name)}
          value={name}
          valid={nameChanged || undefined}
          disabled={updateLoading}
          onChange={event => setName(event.target.value)}
        />
        <PrimaryTextField
          id={'email'}
          label={t(lang.label.email)}
          value={email}
          valid={emailChanged || undefined}
          disabled={updateLoading}
          onChange={event => setEmail(event.target.value)}
        />
        <PhoneTextField
          id={'phone'}
          label={t(lang.label.phone)}
          value={phone}
          valid={phoneChanged || undefined}
          disabled={updateLoading}
          onChange={(userInput: string) => setPhone(userInput)}
        />
      </PanelContentRow>
      <PanelFooterRow>
        <PrimaryButton
          id={'update_settings'}
          onClick={handleUpdateSettings}
          disabled={!basicsChanged || updateLoading}
          style={{ marginRight: '15px' }}
        >
          {t(lang.action.update)}
        </PrimaryButton>
        {basicsChanged ? (
          <PrimaryButton
            id={'reset_account_settings'}
            variant={'outlined'}
            onClick={handleResetSettings}
            disabled={updateLoading}
          >
            {t(lang.action.cancel)}
          </PrimaryButton>
        ) : null}
      </PanelFooterRow>
    </>
  );
}

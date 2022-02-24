import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { UserPassword } from '../../store/types';
import { User } from 'app/pages/Auth/store/types';
import {
  getUserPasswordError,
  getUserPasswordLoading,
  getUserPasswordStatus,
} from '../../store/selectors';

import PasswordTextField from 'app/components/PasswordTextField';
import PasswordReset from 'app/components/PasswordReset';
import PrimaryAlert from 'app/components/PrimaryAlert';
import PrimaryButton from 'app/components/PrimaryButton';
import {
  PanelHeader,
  PanelHeaderRow,
  PanelContentRow,
  PanelFooterRow,
} from 'app/components/PrimaryPanel';
import { lang } from 'locales/translations';

interface UserPasswordProps {
  user: User;
  updateUserPassword: (userPassword: UserPassword) => void;
}

export default function PasswordSettingsView(props: UserPasswordProps) {
  const { t } = useTranslation();
  const updateStatus = useSelector(getUserPasswordStatus);
  const updateError = useSelector(getUserPasswordError);
  const updateLoading = useSelector(getUserPasswordLoading);

  const [passwordOrigin, setPasswordOrigin] = useState<string>('');
  const [password1, setPassword1] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  React.useEffect(() => {
    if (!!updateStatus) {
      setPasswordOrigin('');
    }
  }, [updateStatus]);

  const handleUpdatePassword = () => {
    props.updateUserPassword({
      new: password1,
      confirm: password2,
      current: passwordOrigin,
      username: props.user.username,
    });
  };

  return (
    <>
      <PrimaryAlert severity={'error'} open={!!updateError && updateError.status === 400}>
        {t(lang.settings.alert.incorrect_credentials)}
      </PrimaryAlert>
      <PrimaryAlert severity={'error'} open={!!updateError && updateError.status !== 400}>
        {t(lang.alert.general_error)}
      </PrimaryAlert>
      <PrimaryAlert severity={'success'} open={!!updateStatus}>
        {t(lang.settings.alert.password_updated)}
      </PrimaryAlert>
      <PanelHeaderRow>
        <PanelHeader text={t(lang.settings.password_reset)} />
      </PanelHeaderRow>
      <PanelContentRow>
        <PasswordTextField
          id={'current-password'}
          label={t(lang.label.current_password)}
          value={passwordOrigin}
          onChange={event => setPasswordOrigin(event.target.value)}
        />
        <PasswordReset
          setPassword1={setPassword1}
          setPassword2={setPassword2}
          setIsValid={setIsValid}
        />
      </PanelContentRow>
      <PanelFooterRow>
        <PrimaryButton
          id={'update_password'}
          disabled={updateLoading || !isValid || !passwordOrigin.length}
          onClick={handleUpdatePassword}
        >
          {t(lang.reset_password.submit_button)}
        </PrimaryButton>
      </PanelFooterRow>
    </>
  );
}

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { createOrganizationUser } from '../../../../../Organizations/store/actions';
import {
  createOrganizationUserStatus,
  createOrganizationUserError,
  createOrganizationUserLoading,
} from '../../../../../Organizations/store/selectors';
import { ProtoOrganizationUser } from '../../../../../Organizations/store/types';

import PrimaryTextField from 'app/components/PrimaryTextField';
import PhoneTextField from 'app/components/PhoneTextField';
import PrimaryButton from 'app/components/PrimaryButton';
import PrimaryDrawer, {
  PrimaryDrawerContent,
  PrimaryDrawerFooter,
  PrimaryDrawerLoader,
} from 'app/components/PrimaryDrawer';
import FormAlert from 'app/components/FormAlert';
import { lang } from 'locales/translations';

interface CreateOrganizationUserProps {
  orgId: number;
}

export default function CreateOrganizationUser({ orgId }: CreateOrganizationUserProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const createOrgUserStatus = useSelector(createOrganizationUserStatus);
  const createOrgUserError = useSelector(createOrganizationUserError);
  const createOrgUserLoading = useSelector(createOrganizationUserLoading);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [name, setDisplayName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const [canBeSubmitted, setCanBeSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (!!createOrgUserStatus) {
      handleCloseDrawer();
    }
  }, [createOrgUserStatus]);

  React.useEffect(() => {
    const areRequiredFieldsPresent = !!username && !!name && !!email;
    setCanBeSubmitted(areRequiredFieldsPresent);
  }, [username, name, email, phone]);

  const handleCloseDrawer = () => {
    setIsOpen(false);
    setUsername('');
    setDisplayName('');
    setEmail('');
    setPhone('');
  };

  const handleCreateOrganization = () => {
    const newOrgUser: ProtoOrganizationUser = {
      organization: orgId,
      username: username,
      name: name,
      email: email,
      phone: phone,
    };
    dispatch(createOrganizationUser(newOrgUser));
  };

  return (
    <>
      <PrimaryButton id={'create_org_user_btn'} onClick={() => setIsOpen(true)} disableRipple>
        {t(lang.users.create_user)}
      </PrimaryButton>
      <PrimaryDrawer
        id={'create_org_user_drawer'}
        isOpen={isOpen}
        close={handleCloseDrawer}
        header={t(lang.users.create_user)}
      >
        <PrimaryDrawerContent>
          {createOrgUserLoading ? (
            <PrimaryDrawerLoader />
          ) : (
            !!createOrgUserError && (
              <FormAlert severity={'error'}>{t(lang.alert.general_error)}</FormAlert>
            )
          )}
          <PrimaryTextField
            id={'user_name'}
            size={'small'}
            label={t(lang.label.username)}
            value={username}
            disabled={createOrgUserLoading}
            onChange={event => setUsername(event.target.value)}
          />
          <PrimaryTextField
            id={'contact_name'}
            size={'small'}
            label={t(lang.label.contact_name)}
            value={name}
            disabled={createOrgUserLoading}
            onChange={event => setDisplayName(event.target.value)}
          />
          <PrimaryTextField
            id={'email_address'}
            size={'small'}
            label={t(lang.label.email)}
            value={email}
            disabled={createOrgUserLoading}
            onChange={event => setEmail(event.target.value)}
          />
          <PhoneTextField
            id={'phone'}
            size={'small'}
            label={t(lang.label.phone)}
            value={phone}
            disabled={createOrgUserLoading}
            onChange={(userInput: string) => setPhone(userInput)}
          />
        </PrimaryDrawerContent>
        <PrimaryDrawerFooter>
          <PrimaryButton
            id={'create_org_user_btn'}
            style={{ marginRight: '16px' }}
            onClick={handleCreateOrganization}
            disabled={!canBeSubmitted || createOrgUserLoading}
          >
            {t(lang.action.create)}
          </PrimaryButton>
          <PrimaryButton
            id={'cancel_create_org_btn'}
            variant={'outlined'}
            onClick={handleCloseDrawer}
            disabled={createOrgUserLoading}
          >
            {t(lang.action.cancel)}
          </PrimaryButton>
        </PrimaryDrawerFooter>
      </PrimaryDrawer>
    </>
  );
}

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { createOrganization } from '../../store/actions';
import { fetchCountries } from 'app/store/actions';
import {
  createOrganizationStatus,
  createOrganizationError,
  createOrganizationLoading,
} from '../../store/selectors';
import {
  getCountriesData,
  getCountriesDictionary,
  getCountriesError,
  getCountriesLoading,
} from 'app/store/selectors';
import { ProtoOrganization } from '../../store/types';

import { MenuItem } from '@material-ui/core';
import PrimaryTextField from 'app/components/PrimaryTextField';
import PhoneTextField from 'app/components/PhoneTextField';
import PrimaryButton from 'app/components/PrimaryButton';
import PrimaryDrawer, {
  PrimaryDrawerContent,
  PrimaryDrawerFooter,
  PrimaryDrawerLoader,
} from 'app/components/PrimaryDrawer';
import PrimarySelect from 'app/components/PrimarySelect';
import ServerError from 'app/components/ServerError';
import FormAlert from 'app/components/FormAlert';
import { lang } from 'locales/translations';

export default function CreateOrganization() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const countriesData = useSelector(getCountriesData);
  const countriesDictionary = useSelector(getCountriesDictionary);
  const countriesError = useSelector(getCountriesError);
  const countriesLoading = useSelector(getCountriesLoading);
  const createOrgStatus = useSelector(createOrganizationStatus);
  const createOrgError = useSelector(createOrganizationError);
  const createOrgLoading = useSelector(createOrganizationLoading);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [name, setOrgName] = useState<string>('');
  const [contactName, setContactName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [country, setCountry] = useState<string>('US');
  const [address1, setAddress1] = useState<string>('');
  const [address2, setAddress2] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');

  const [canBeSubmitted, setCanBeSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (!!createOrgStatus) {
      handleCloseDrawer();
    }
  }, [createOrgStatus]);

  React.useEffect(() => {
    const areRequiredFieldsPresent =
      !!name &&
      !!contactName &&
      !!email &&
      !!phone &&
      !!country &&
      !!address1 &&
      !!city &&
      !!state &&
      !!zipCode;
    setCanBeSubmitted(areRequiredFieldsPresent);
  }, [name, contactName, email, phone, country, address1, city, state, zipCode]);

  const handleChangeCountry = (value: string) => {
    setCountry(value);
    setAddress1('');
    setAddress2('');
    setCity('');
    setState('');
    setZipCode('');
  };

  const handleCloseDrawer = () => {
    setIsOpen(false);
    setOrgName('');
    setContactName('');
    setEmail('');
    setPhone('');
    setCountry('US');
    setAddress1('');
    setAddress2('');
    setCity('');
    setState('');
    setZipCode('');
  };

  const handleCreateOrganization = () => {
    const newOrg: ProtoOrganization = {
      name: name,
      contact_name: contactName,
      email: email,
      phone: phone,
      country: country,
      address: address1,
      address2: address2,
      city: city,
      state: state,
      zip_code: zipCode,
    };
    dispatch(createOrganization(newOrg));
  };

  return (
    <>
      <PrimaryButton id={'create_org_btn'} onClick={() => setIsOpen(true)} disableRipple>
        {t(lang.organizations.create_organization)}
      </PrimaryButton>
      <PrimaryDrawer
        id={'create_org_drawer'}
        isOpen={isOpen}
        close={handleCloseDrawer}
        header={t(lang.organizations.create_organization)}
      >
        {!!countriesError ? (
          <PrimaryDrawerContent>
            <ServerError
              loading={countriesLoading}
              retry={() => {
                dispatch(fetchCountries());
              }}
            />
          </PrimaryDrawerContent>
        ) : (
          <>
            <PrimaryDrawerContent>
              {createOrgLoading ? (
                <PrimaryDrawerLoader />
              ) : (
                !!createOrgError && (
                  <FormAlert severity={'error'}>{t(lang.alert.general_error)}</FormAlert>
                )
              )}
              <PrimaryTextField
                id={'organization_name'}
                size={'small'}
                label={t(lang.label.org_name)}
                value={name}
                disabled={createOrgLoading}
                onChange={event => setOrgName(event.target.value)}
              />
              <PrimaryTextField
                id={'contact_name'}
                size={'small'}
                label={t(lang.label.contact_name)}
                value={contactName}
                disabled={createOrgLoading}
                onChange={event => setContactName(event.target.value)}
              />
              <PrimaryTextField
                id={'email_address'}
                size={'small'}
                label={t(lang.label.email)}
                value={email}
                disabled={createOrgLoading}
                onChange={event => setEmail(event.target.value)}
              />
              <PhoneTextField
                id={'phone'}
                size={'small'}
                label={t(lang.label.phone)}
                value={phone}
                disabled={createOrgLoading}
                onChange={(userInput: string) => setPhone(userInput)}
              />
              <PrimarySelect
                id={'country'}
                size={'small'}
                label={t(lang.label.country)}
                value={country}
                disabled={createOrgLoading}
                onChange={value => handleChangeCountry(value)}
              >
                {countriesData?.map(country => (
                  <MenuItem key={`country_option_${country.value}`} value={country.value}>
                    {country.name}
                  </MenuItem>
                ))}
              </PrimarySelect>
              {!!countriesDictionary
                ? countriesDictionary[country].fields.map(countryField => {
                    switch (countryField.field) {
                      case 'address':
                        return (
                          <PrimaryTextField
                            id={'address1'}
                            key={'address1'}
                            size={'small'}
                            label={t(lang.address[countryField.display])}
                            value={address1}
                            disabled={createOrgLoading}
                            onChange={event => setAddress1(event.target.value)}
                          />
                        );
                      case 'address2':
                        return (
                          <PrimaryTextField
                            id={'address2'}
                            key={'address2'}
                            size={'small'}
                            label={t(lang.address[countryField.display])}
                            value={address2}
                            disabled={createOrgLoading}
                            onChange={event => setAddress2(event.target.value)}
                          />
                        );
                      case 'city':
                        return (
                          <PrimaryTextField
                            id={'city'}
                            key={'city'}
                            size={'small'}
                            label={t(lang.address[countryField.display])}
                            value={city}
                            disabled={createOrgLoading}
                            onChange={event => setCity(event.target.value)}
                          />
                        );
                      case 'state':
                        return (
                          <PrimarySelect
                            id={'state'}
                            key={'state'}
                            size={'small'}
                            label={t(lang.address[countryField.display])}
                            value={state}
                            disabled={createOrgLoading}
                            onChange={value => setState(value)}
                          >
                            {!!countryField.values
                              ? Object.entries(countryField.values).map(fieldValue => (
                                  <MenuItem
                                    key={`state_option_${fieldValue[0]}`}
                                    value={fieldValue[0]}
                                  >
                                    {fieldValue[1]}
                                  </MenuItem>
                                ))
                              : null}
                          </PrimarySelect>
                        );
                      case 'zip_code':
                        return (
                          <PrimaryTextField
                            id={'zipCode'}
                            key={'zipCode'}
                            size={'small'}
                            label={t(lang.address[countryField.display])}
                            value={zipCode}
                            disabled={createOrgLoading}
                            onChange={event => setZipCode(event.target.value)}
                          />
                        );
                      default:
                        return null;
                    }
                  })
                : null}
            </PrimaryDrawerContent>
            <PrimaryDrawerFooter>
              <PrimaryButton
                id={'create_org_btn'}
                style={{ marginRight: '16px' }}
                onClick={handleCreateOrganization}
                disabled={!canBeSubmitted || createOrgLoading}
              >
                {t(lang.action.create)}
              </PrimaryButton>
              <PrimaryButton
                id={'cancel_create_org_btn'}
                variant={'outlined'}
                onClick={handleCloseDrawer}
                disabled={createOrgLoading}
              >
                {t(lang.action.cancel)}
              </PrimaryButton>
            </PrimaryDrawerFooter>
          </>
        )}
      </PrimaryDrawer>
    </>
  );
}

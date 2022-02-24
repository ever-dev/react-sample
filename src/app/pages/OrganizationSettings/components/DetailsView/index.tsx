import * as React from 'react';
import { useState } from 'react';
import { useFormState } from 'utils/useFormState';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { fetchCountries } from 'app/store/actions';
import {
  getCountriesData,
  getCountriesDictionary,
  getCountriesError,
  getCountriesLoading,
} from 'app/store/selectors';
import {
  updateOrganizationError,
  updateOrganizationLoading,
  updateOrganizationStatus,
} from 'app/pages/Organizations/store/selectors';
import { Organization } from 'app/pages/Organizations/store/types';

import { MenuItem } from '@material-ui/core';
import PrimaryTextField from 'app/components/PrimaryTextField';
import PhoneTextField from 'app/components/PhoneTextField';
import PrimaryAlert from 'app/components/PrimaryAlert';
import PrimarySelect from 'app/components/PrimarySelect';
import ServerError from 'app/components/ServerError';
import PrimaryButton from 'app/components/PrimaryButton';
import {
  PanelHeader,
  PanelHeaderRow,
  PanelColumn,
  PanelContentRow,
  PanelFooterRow,
} from 'app/components/PrimaryPanel';
import ImageImporter from 'app/components/ImageImporter';
import { lang } from 'locales/translations';

interface OrganizationDetailsProps {
  organization: Organization;
  updateDetails: (data: Organization) => void;
}

export default function OrganizationDetailsView(props: OrganizationDetailsProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const org = props.organization;

  const countriesData = useSelector(getCountriesData);
  const countriesDictionary = useSelector(getCountriesDictionary);
  const countriesError = useSelector(getCountriesError);
  const countriesLoading = useSelector(getCountriesLoading);

  const updateStatus = useSelector(updateOrganizationStatus);
  const updateError = useSelector(updateOrganizationError);
  const updateLoading = useSelector(updateOrganizationLoading);

  const [name, setOrgName, orgNameChanged] = useFormState(org.name || '');
  const [contact, setContact, contactChanged] = useFormState(org.contact_name || '');
  const [email, setEmail, emailChanged] = useFormState(org.email || '');
  const [phone, setPhone, phoneChanged] = useFormState(org.phone || '');
  const [country, setCountry, countryChanged] = useFormState(org.country || 'US');
  const [address1, setAddress1, address1Changed] = useFormState(org.address || '');
  const [address2, setAddress2, address2Changed] = useFormState(org.address2 || '');
  const [city, setCity, cityChanged] = useFormState(org.city || '');
  const [state, setState, stateChanged] = useFormState(org.state || '');
  const [zipCode, setZipCode, zipCodeChanged] = useFormState(org.zip_code || '');

  const [detailsChanged, setDetailsChanged] = useState<boolean>(false);

  React.useEffect(() => {
    const areDetailsChanged =
      orgNameChanged ||
      contactChanged ||
      emailChanged ||
      phoneChanged ||
      countryChanged ||
      address1Changed ||
      address2Changed ||
      cityChanged ||
      stateChanged ||
      zipCodeChanged;
    setDetailsChanged(areDetailsChanged);
  }, [
    orgNameChanged,
    contactChanged,
    emailChanged,
    phoneChanged,
    countryChanged,
    address1Changed,
    address2Changed,
    cityChanged,
    stateChanged,
    zipCodeChanged,
  ]);

  const handleResetDetails = () => {
    setOrgName(org.name || '');
    setContact(org.contact_name || '');
    setEmail(org.email || '');
    setPhone(org.phone || '');
    setCountry(org.country || 'US');
    setAddress1(org.address || '');
    setAddress2(org.address2 || '');
    setCity(org.city || '');
    setState(org.state || '');
    setZipCode(org.zip_code || '');
  };

  const handleUpdateDetails = () => {
    const updatedOrg: Organization = {
      ...org,
      name: name,
      contact_name: contact,
      email: email,
      phone: phone,
      country: country,
      address: address1,
      address2: address2,
      city: city,
      state: state,
      zip_code: zipCode,
    };
    props.updateDetails(updatedOrg);
  };

  const handleChangeCountry = (value: string) => {
    setCountry(value);
    setAddress1('');
    setAddress2('');
    setCity('');
    setState('');
    setZipCode('');
  };

  if (!!countriesError) {
    return (
      <ServerError
        loading={countriesLoading}
        retry={() => {
          dispatch(fetchCountries());
        }}
      />
    );
  }

  return (
    <>
      <PrimaryAlert severity={'error'} open={!!updateError}>
        {t(lang.alert.general_error)}
      </PrimaryAlert>
      <PrimaryAlert severity={'success'} open={!!updateStatus}>
        {t(lang.settings.alert.settings_updated)}
      </PrimaryAlert>
      <PanelHeaderRow>
        <PanelHeader text={t(lang.organizations.details_tabs.details)} />
      </PanelHeaderRow>
      <PanelContentRow>
        <PanelColumn>
          <PrimaryTextField
            id={'organization_name'}
            label={t(lang.label.org_name)}
            value={name}
            valid={orgNameChanged || undefined}
            disabled={updateLoading}
            onChange={event => setOrgName(event.target.value)}
          />
          <PrimaryTextField
            id={'contact_name'}
            label={t(lang.label.contact_name)}
            value={contact}
            valid={contactChanged || undefined}
            disabled={updateLoading}
            onChange={event => setContact(event.target.value)}
          />
          <PrimaryTextField
            id={'email_address'}
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
        </PanelColumn>
        <PanelColumn>
          <PrimarySelect
            id={'country'}
            label={t(lang.label.country)}
            value={country}
            changed={countryChanged}
            disabled={updateLoading}
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
                        label={t(lang.address[countryField.display])}
                        value={address1}
                        valid={address1Changed || undefined}
                        disabled={updateLoading}
                        onChange={event => setAddress1(event.target.value)}
                      />
                    );
                  case 'address2':
                    return (
                      <PrimaryTextField
                        id={'address2'}
                        key={'address2'}
                        label={t(lang.address[countryField.display])}
                        value={address2}
                        valid={address2Changed || undefined}
                        disabled={updateLoading}
                        onChange={event => setAddress2(event.target.value)}
                      />
                    );
                  case 'city':
                    return (
                      <PrimaryTextField
                        id={'city'}
                        key={'city'}
                        label={t(lang.address[countryField.display])}
                        value={city}
                        valid={cityChanged || undefined}
                        disabled={updateLoading}
                        onChange={event => setCity(event.target.value)}
                      />
                    );
                  case 'state':
                    return (
                      <PrimarySelect
                        id={'state'}
                        key={'state'}
                        label={t(lang.address[countryField.display])}
                        value={state}
                        changed={stateChanged}
                        disabled={updateLoading}
                        onChange={value => setState(value)}
                      >
                        {!!countryField.values
                          ? Object.entries(countryField.values).map(fieldValue => (
                              <MenuItem key={`state_option_${fieldValue[0]}`} value={fieldValue[0]}>
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
                        label={t(lang.address[countryField.display])}
                        type={'number'}
                        value={zipCode}
                        valid={zipCodeChanged || undefined}
                        disabled={updateLoading}
                        onChange={event => setZipCode(event.target.value)}
                      />
                    );
                  default:
                    return null;
                }
              })
            : null}
        </PanelColumn>
      </PanelContentRow>
      <PanelFooterRow>
        <PrimaryButton
          id={'update_details'}
          onClick={handleUpdateDetails}
          disabled={!detailsChanged || updateLoading}
          style={{ marginRight: '15px' }}
        >
          {t(lang.action.update)}
        </PrimaryButton>
        {detailsChanged ? (
          <PrimaryButton
            id={'reset_details'}
            variant={'outlined'}
            onClick={handleResetDetails}
            disabled={updateLoading}
          >
            {t(lang.action.cancel)}
          </PrimaryButton>
        ) : null}
      </PanelFooterRow>
      <PanelContentRow style={{ padding: '16px 16px 0 0', width: '50%' }}>
        <ImageImporter />
      </PanelContentRow>
    </>
  );
}

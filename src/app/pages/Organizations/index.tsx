import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

import {
  getOrganizationsData,
  getOrganizationsError,
  getOrganizationsLoading,
  removeOrganizationStatus,
  removeOrganizationError,
  removeOrganizationLoading,
  createOrganizationStatus,
} from './store/selectors';
import { clearOrganizationsContext, fetchOrganizations, removeOrganization } from './store/actions';
import { OrganizationProfiles } from './store/types';

import { createStyles, Link, makeStyles } from '@material-ui/core';
import { GridCellParams, GridColumns, GridRowModel } from '@material-ui/x-grid';
import PrimaryContainer from 'app/components/PrimaryContainer';
import PrimaryTable from 'app/components/PrimaryTable';
import EmptyTable from 'app/components/EmptyTable';
import SearchTextField from 'app/components/SearchTextField';
import ServerError from 'app/components/ServerError';
import PrimaryButton from 'app/components/PrimaryButton';
import ProfileChip from 'app/components/ProfileChip';
import PrimaryAlert from 'app/components/PrimaryAlert';
import {
  PrimaryPanel,
  PanelHeaderRow,
  PanelHeaderContent,
  PanelHeaderButtons,
  PanelContentRow,
} from '../../components/PrimaryPanel';
import CreateOrganization from './components/CreateOrganization';
import { lang } from 'locales/translations';

const useStyles = makeStyles(theme =>
  createStyles({
    orgNameWrapper: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    chipsWrapper: {
      width: '100%',
      whiteSpace: 'normal',
      lineHeight: '22px',
    },
  }),
);

export function OrganizationsPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const orgData = useSelector(getOrganizationsData);
  const orgError = useSelector(getOrganizationsError);
  const orgLoading = useSelector(getOrganizationsLoading);
  const orgDeleteStatus = useSelector(removeOrganizationStatus);
  const orgDeleteError = useSelector(removeOrganizationError);
  const orgDeleteLoading = useSelector(removeOrganizationLoading);
  const createOrgStatus = useSelector(createOrganizationStatus);

  const [status] = useState<string>('active');
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchFields] = useState<string>('name,contact_name,email,phone');
  const [sortQuery, setSortQuery] = useState<string>('');

  useEffect(() => {
    return () => {
      dispatch(clearOrganizationsContext());
    };
  }, [dispatch]);

  const handleFetchOrganizations = useCallback(() => {
    dispatch(
      fetchOrganizations({
        page_number: pageNumber,
        page_size: pageSize,
        status: status,
        search_text: searchQuery,
        search_fields: searchFields,
        sort_field: sortQuery,
      }),
    );
  }, [pageNumber, pageSize, status, searchQuery, searchFields, sortQuery, dispatch]);

  React.useEffect(() => {
    handleFetchOrganizations();
  }, [handleFetchOrganizations]);

  React.useEffect(
    () => {
      if (!!orgDeleteStatus || !!createOrgStatus) {
        handleFetchOrganizations();
      }
    }, // eslint-disable-next-line
    [orgDeleteStatus, createOrgStatus],
  );

  const handlePageChange = (page: number) => {
    setPageNumber(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
  };

  const handleSearchQueryChange = (value: string) => {
    if (searchQuery !== value) {
      setPageNumber(1);
      setSearchQuery(value);
    }
  };

  const handleSortChange = (value: string) => {
    setSortQuery(value);
  };

  const orgHeaders: GridColumns = [
    {
      field: 'name',
      renderCell: (params: GridCellParams) => {
        return (
          <div className={classes.orgNameWrapper}>
            {!!params.row.rate_logo ? (
              <img
                alt={'Rate Logo'}
                style={{ maxWidth: '25px', marginRight: '7px' }}
                src={params.row.rate_logo}
              />
            ) : null}
            <Link variant={'body2'} component={RouterLink} to={`/organizations/${params.row.id}`}>
              {params.value}
            </Link>
          </div>
        );
      },
      headerName: t(lang.organizations.headers.name),
      flex: 1.15,
    },
    {
      field: 'profiles',
      sortable: false,
      headerName: t(lang.organizations.headers.profile),
      renderCell: (params: GridCellParams) => {
        if (!params.value) return <></>;
        const profiles = params.value as OrganizationProfiles;
        return (
          <div className={classes.chipsWrapper}>
            {profiles.includes('admin') ? (
              <ProfileChip id={'admin_profile'} profile={'admin'} />
            ) : null}
            {profiles.includes('shipper') ? (
              <ProfileChip id={'shipper_profile'} profile={'shipper'} />
            ) : null}
            {profiles.includes('ratepartner') ? (
              <ProfileChip id={'ratepartner_profile'} profile={'ratepartner'} />
            ) : null}
            {profiles.includes('cartage') ? (
              <ProfileChip id={'cartage_profile'} profile={'cartage'} />
            ) : null}
            {profiles.includes('demo') ? (
              <ProfileChip id={'demo_profile'} profile={'demo'} />
            ) : null}
          </div>
        );
      },
      flex: 1,
    },
    {
      field: 'contact_name',
      headerName: t(lang.organizations.headers.contact),
      flex: 1,
    },
    {
      field: 'email',
      headerName: t(lang.organizations.headers.email),
      flex: 1.15,
    },
    {
      field: 'phone',
      headerName: t(lang.organizations.headers.phone),
      flex: 1,
    },
  ];

  if (orgError) {
    return (
      <PrimaryContainer>
        <ServerError loading={orgLoading} retry={handleFetchOrganizations} />
      </PrimaryContainer>
    );
  }

  const isOrgsEmpty = !searchQuery && !orgLoading && orgData && !orgData.items.length;

  return (
    <PrimaryContainer>
      <PrimaryPanel id={'organizations_list_panel'}>
        <PrimaryAlert severity={'error'} open={!!orgDeleteError}>
          {t(lang.alert.general_error)}
        </PrimaryAlert>
        <PrimaryAlert severity={'success'} open={!!orgDeleteStatus}>
          {t(lang.settings.alert.organization_deleted)}
        </PrimaryAlert>
        <PrimaryAlert severity={'success'} open={!!createOrgStatus}>
          {t(lang.settings.alert.organization_created)}
        </PrimaryAlert>
        <PanelHeaderRow>
          {!isOrgsEmpty ? (
            <PanelHeaderContent>
              <SearchTextField id={'search_organizations'} onBlur={handleSearchQueryChange} />
            </PanelHeaderContent>
          ) : null}
          <PanelHeaderButtons>
            <PrimaryButton id={'upload_organizations'} variant={'outlined'}>
              Upload Organizations
            </PrimaryButton>
            <CreateOrganization />
          </PanelHeaderButtons>
        </PanelHeaderRow>
        <PanelContentRow>
          {isOrgsEmpty ? (
            <EmptyTable
              id={'no_organizations'}
              header={t(lang.organizations.no_organizations_header)}
              subheader={t(lang.organizations.no_organizations_subheader)}
            />
          ) : (
            <PrimaryTable
              entities={'organizations'}
              loading={orgLoading || orgDeleteLoading}
              columns={orgHeaders}
              rows={orgData ? (orgData.items as GridRowModel[]) : []}
              page={pageNumber - 1}
              pageSize={pageSize}
              rowCount={orgData && orgData.items.length ? orgData.total_count : 0}
              checkboxSelection
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              onSortChange={handleSortChange}
              onDelete={data => dispatch(removeOrganization(data))}
            />
          )}
        </PanelContentRow>
      </PrimaryPanel>
    </PrimaryContainer>
  );
}

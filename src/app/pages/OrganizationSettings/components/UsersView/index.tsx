import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  createOrganizationUserStatus,
  getOrganizationUsersData,
  getOrganizationUsersError,
  getOrganizationUsersLoading,
  removeOrganizationUserError,
  removeOrganizationUserLoading,
  removeOrganizationUserStatus,
} from '../../../Organizations/store/selectors';
import {
  clearOrganizationUsers,
  fetchOrganizationUsers,
  removeOrganizationUser,
} from '../../../Organizations/store/actions';

import { Link, makeStyles, createStyles } from '@material-ui/core';
import { GridCellParams, GridColumns, GridRowModel } from '@material-ui/x-grid';
import PrimaryTable from 'app/components/PrimaryTable';
import EmptyTable from 'app/components/EmptyTable';
import SearchTextField from 'app/components/SearchTextField';
import ServerError from 'app/components/ServerError';
import EmailRenderer from 'app/components/EmailRenderer';
import PrimaryAlert from 'app/components/PrimaryAlert';
import PhoneNumberRenderer from 'app/components/PhoneNumberRenderer';
import {
  PanelHeader,
  PanelHeaderRow,
  PanelHeaderButtons,
  PanelHeaderContent,
  PanelContentRow,
} from '../../../../components/PrimaryPanel';
import CreateOrganizationUser from './components/CreateOrganizationUser';
import { lang } from 'locales/translations';

const useStyles = makeStyles(theme =>
  createStyles({
    textCellWrapper: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
  }),
);

interface OrganizationUserViewProps {
  orgId: number;
}

function OrganizationUserView({ orgId }: OrganizationUserViewProps) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const usersData = useSelector(getOrganizationUsersData);
  const usersError = useSelector(getOrganizationUsersError);
  const usersLoading = useSelector(getOrganizationUsersLoading);
  const orgUserDeleteStatus = useSelector(removeOrganizationUserStatus);
  const orgUserDeleteError = useSelector(removeOrganizationUserError);
  const orgUserDeleteLoading = useSelector(removeOrganizationUserLoading);
  const createOrgUserStatus = useSelector(createOrganizationUserStatus);

  const [status] = useState<string>('active,invite,lockout');
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchFields] = useState<string>('username,name,email,phone');
  const [sortQuery, setSortQuery] = useState<string>('');

  const handleFetchOrganizationUsers = useCallback(() => {
    dispatch(
      fetchOrganizationUsers({
        organization: orgId,
        page_number: pageNumber,
        page_size: pageSize,
        status: status,
        search_text: searchQuery,
        search_fields: searchFields,
        sort_field: sortQuery,
      }),
    );
  }, [orgId, pageNumber, pageSize, status, searchQuery, searchFields, sortQuery, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearOrganizationUsers());
    };
  }, [dispatch]);

  useEffect(() => {
    handleFetchOrganizationUsers();
  }, [handleFetchOrganizationUsers]);

  useEffect(
    () => {
      if (!!orgUserDeleteStatus || !!createOrgUserStatus) {
        handleFetchOrganizationUsers();
      }
    }, // eslint-disable-next-line
    [orgUserDeleteStatus, createOrgUserStatus],
  );

  const handleSearchQueryChange = (value: string) => {
    if (searchQuery !== value) {
      setPageNumber(1);
      setSearchQuery(value);
    }
  };

  const handleDelete = useCallback(data => dispatch(removeOrganizationUser(data)), [dispatch]);

  const usersHeaders: GridColumns = [
    {
      field: 'username',
      renderCell: (params: GridCellParams) => {
        return (
          <div className={classes.textCellWrapper}>
            <Link
              variant={'body2'}
              component={RouterLink}
              to={`/organizations/${orgId}/users/${params.row.id}`}
            >
              {params.value}
            </Link>
          </div>
        );
      },
      headerName: t(lang.users.headers.username),
      flex: 1.15,
    },
    {
      field: 'name',
      headerName: t(lang.users.headers.contact_name),
      flex: 1,
    },
    {
      field: 'email',
      headerName: t(lang.users.headers.email),
      flex: 1.15,
      renderCell: (params: GridCellParams) => {
        return (
          <div className={classes.textCellWrapper}>
            <EmailRenderer email={params.value as string} />
          </div>
        );
      },
    },
    {
      field: 'phone',
      headerName: t(lang.users.headers.phone),
      flex: 1,
      renderCell: (params: GridCellParams) => {
        return (
          <div className={classes.textCellWrapper}>
            <PhoneNumberRenderer phoneNumber={params.value as string} />
          </div>
        );
      },
    },
  ];

  if (usersError) {
    return <ServerError loading={usersLoading} retry={handleFetchOrganizationUsers} />;
  }

  const isUsersEmpty = !searchQuery && !usersLoading && usersData && !usersData.items.length;

  return (
    <>
      <PrimaryAlert severity={'error'} open={!!orgUserDeleteError}>
        {t(lang.alert.general_error)}
      </PrimaryAlert>
      <PrimaryAlert severity={'success'} open={!!orgUserDeleteStatus}>
        {t(lang.settings.alert.organization_user_deleted)}
      </PrimaryAlert>
      <PrimaryAlert severity={'success'} open={!!createOrgUserStatus}>
        {t(lang.settings.alert.organization_user_created)}
      </PrimaryAlert>
      <PanelHeaderRow>
        <PanelHeader text={t(lang.organizations.details_tabs.users)} />
        {!isUsersEmpty ? (
          <PanelHeaderContent>
            <SearchTextField id={'search_users'} onBlur={handleSearchQueryChange} />
          </PanelHeaderContent>
        ) : null}
        <PanelHeaderButtons>
          <CreateOrganizationUser orgId={orgId} />
        </PanelHeaderButtons>
      </PanelHeaderRow>
      <PanelContentRow>
        {isUsersEmpty ? (
          <EmptyTable
            id={'no_users'}
            header={t(lang.users.no_users_header)}
            subheader={t(lang.users.no_users_subheader)}
          />
        ) : (
          <PrimaryTable
            entities={'users'}
            loading={usersLoading || orgUserDeleteLoading}
            columns={usersHeaders}
            rows={usersData ? (usersData.items as GridRowModel[]) : []}
            page={pageNumber - 1}
            pageSize={pageSize}
            rowCount={usersData && usersData.items.length ? usersData.total_count : 0}
            checkboxSelection
            onPageChange={setPageNumber}
            onPageSizeChange={setPageSize}
            onSortChange={setSortQuery}
            onDelete={handleDelete}
          />
        )}
      </PanelContentRow>
    </>
  );
}

export default OrganizationUserView;

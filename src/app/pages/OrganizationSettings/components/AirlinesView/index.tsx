import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  getOrganizationAirlinesData,
  getOrganizationAirlinesError,
  getOrganizationAirlinesLoading,
} from '../../../Organizations/store/selectors';
import { fetchOrganizationAirlines } from '../../../Organizations/store/actions';
import { AirlinesData } from '../../../Organizations/store/types';
import { ApiError } from 'store/types';

import { Link, Typography } from '@material-ui/core';
import { GridCellParams, GridColumns, GridRowModel } from '@material-ui/x-grid';
import PrimaryContainer from 'app/components/PrimaryContainer';
import SimpleTable from 'app/components/SimpleTable';
import EmptyTable from 'app/components/EmptyTable';
import AlertChip from 'app/components/AlertChip';
import ServerError from 'app/components/ServerError';
import { PanelContentRow, PanelHeader, PanelHeaderRow } from 'app/components/PrimaryPanel';
import { lang } from 'locales/translations';

interface OrganizationAirlinesProps {
  orgId: number;
}

export default function OrganizationAirlinesView({ orgId }: OrganizationAirlinesProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const airlinesData: AirlinesData | undefined = useSelector(getOrganizationAirlinesData);
  const airlinesError: ApiError | undefined = useSelector(getOrganizationAirlinesError);
  const airlinesLoading: boolean = useSelector(getOrganizationAirlinesLoading);

  useEffect(() => {
    dispatch(fetchOrganizationAirlines(orgId));
  }, [orgId, dispatch]);

  const airlinesHeaders: GridColumns = [
    {
      field: 'airline_name',
      renderCell: (params: GridCellParams) => {
        return (
          <Link
            variant={'body2'}
            component={RouterLink}
            to={`/organizations/${params.row.organization}/airlines/${params.row.air_waybill_number_airline_prefix}/${params.row.id}`}
          >
            {params.value}
          </Link>
        );
      },
      headerName: t(lang.airlines.airline),
      flex: 1,
    },
    {
      field: 'account_number',
      headerName: t(lang.airlines.account_number),
      flex: 1,
    },
    {
      field: 'available_awb_number_count',
      renderCell: (params: GridCellParams) => {
        return (
          <>
            <Typography
              variant={'body2'}
              component={'span'}
              color={params.value && params.value < 50 ? 'error' : undefined}
              style={{ marginRight: '10px' }}
            >
              {params.value}
            </Typography>
            {params.value && params.value < 50 ? (
              <AlertChip
                id={`alert_${params.row.id}`}
                status={'error'}
                text={t(lang.air_waybills.low_count)}
              />
            ) : null}
          </>
        );
      },
      headerName: t(lang.airlines.awb_number_count),
      flex: 1,
    },
  ];

  if (airlinesError) {
    return (
      <PrimaryContainer>
        <ServerError
          loading={airlinesLoading}
          retry={() => {
            dispatch(fetchOrganizationAirlines(orgId));
          }}
        />
      </PrimaryContainer>
    );
  }

  return (
    <>
      <PanelHeaderRow>
        <PanelHeader text={t(lang.organizations.details_tabs.airlines)} />
      </PanelHeaderRow>
      <PanelContentRow>
        {!airlinesLoading && airlinesData && !airlinesData.items.length ? (
          <EmptyTable
            id={'no_airlines'}
            header={t(lang.airlines.no_airlines_header)}
            subheader={t(lang.airlines.no_airlines_subheader)}
          />
        ) : (
          <SimpleTable
            loading={airlinesLoading}
            columns={airlinesHeaders}
            rows={
              airlinesData && airlinesData.items.length
                ? (airlinesData.items as GridRowModel[])
                : []
            }
          />
        )}
      </PanelContentRow>
    </>
  );
}

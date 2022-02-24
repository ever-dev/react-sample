import React from 'react';

import { createStyles, makeStyles } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PrimaryStepper from '../../PrimaryStepper';
import PrimaryButton from '../../PrimaryButton';

const useStyles = makeStyles(theme =>
  createStyles({
    CSVImporter_ImporterFrame: {
      border: `1px solid ${theme.palette.grey[400]}`,
      padding: '1.2em',
      borderRadius: '0.4em',
      background: theme.palette.common.white,
      height: '560px',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
    },
    CSVImporter_ImporterFrame__header: {
      display: 'block',
      flex: '1 1 0',
    },
    CSVImporter_ImporterFrame__content: {
      flex: '1 1 100%',
    },
    CSVImporter_ImporterFrame__footer: {
      display: 'flex',
      alignItems: 'center',
      flex: '1 1 0',
    },
    CSVImporter_ImporterFrame__footerFill: {
      flex: '1 1 0',
    },
    CSVImporter_ImporterFrame__footerError: {
      flex: 'none',
      marginRight: '1em',
      lineHeight: '0.8',
      color: theme.palette.error.main,
      wordBreak: 'break-word',
    },
  }),
);

export const ImporterFrame: React.FC<{
  fileName: string;
  step: number;
  secondaryDisabled?: boolean;
  secondaryLabel?: string;
  nextDisabled?: boolean;
  nextLabel?: string;
  error?: string | null;
  onSecondary?: () => void;
  onNext: () => void;
  onClose?: () => void;
}> = ({
  fileName,
  step,
  secondaryDisabled,
  secondaryLabel,
  nextDisabled,
  nextLabel,
  error,
  onSecondary,
  onNext,
  onClose,
  children,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.CSVImporter_ImporterFrame}>
      <div className={classes.CSVImporter_ImporterFrame__header}>
        <PrimaryStepper
          id={'csv_importer_stepper'}
          activeStep={step}
          steps={[{ label: 'Upload', subLabel: fileName }, { label: 'Map' }, { label: 'Details' }]}
        />
      </div>
      <div className={classes.CSVImporter_ImporterFrame__content}>{children}</div>
      <div className={classes.CSVImporter_ImporterFrame__footer}>
        <PrimaryButton
          id={'csv_uploader_back_btn'}
          variant={'outlined'}
          disabled={!!secondaryDisabled}
          onClick={onSecondary}
          startIcon={secondaryLabel ? undefined : <ChevronLeftIcon fontSize={'small'} />}
        >
          {secondaryLabel || 'Back'}
        </PrimaryButton>
        {onClose ? (
          <PrimaryButton
            id={'csv_uploader_cancel_btn'}
            variant={'text'}
            onClick={onClose}
            style={{ marginLeft: '10px' }}
          >
            Cancel
          </PrimaryButton>
        ) : null}
        <div className={classes.CSVImporter_ImporterFrame__footerFill} />
        {error ? (
          <div className={classes.CSVImporter_ImporterFrame__footerError} role={'status'}>
            {error}
          </div>
        ) : null}
        <PrimaryButton
          id={'csv_uploader_next_btn'}
          disabled={!!nextDisabled}
          onClick={onNext}
          endIcon={nextLabel ? undefined : <ChevronRightIcon fontSize={'small'} />}
        >
          {nextLabel || 'Next'}
        </PrimaryButton>
      </div>
    </div>
  );
};

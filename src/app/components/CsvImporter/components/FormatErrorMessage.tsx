import React from 'react';

import { createStyles, makeStyles } from '@material-ui/core';
import PrimaryButton from '../../PrimaryButton';

const useStyles = makeStyles(theme =>
  createStyles({
    CSVImporter_FormatErrorMessage: {
      display: 'flex',
      alignItems: 'center',
      padding: '0.5em 1em',
      borderRadius: '0.4em',
      background: theme.palette.grey[100],
      color: theme.palette.error.main,
      '& > span': {
        flex: '1 1 0',
        marginRight: '1em',
        width: 0,
        wordBreak: 'break-word',
      },
    },
  }),
);

export const FormatErrorMessage: React.FC<{
  onCancelClick: () => void;
  // eslint-disable-next-line react/display-name
}> = React.memo(({ onCancelClick, children }) => {
  const classes = useStyles();
  return (
    <div className={classes.CSVImporter_FormatErrorMessage}>
      <span>{children}</span>
      <PrimaryButton id={'csv_uploader_error_back_btn'} onClick={onCancelClick}>
        Go Back
      </PrimaryButton>
    </div>
  );
});

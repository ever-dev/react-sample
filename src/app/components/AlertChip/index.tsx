import * as React from 'react';
import { Chip, createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme =>
  createStyles({
    alertChip: {
      color: theme.palette.common.white,
      height: '22px',
      lineHeight: '22px',
      margin: '1px 2px',
      '&.error': {
        backgroundColor: theme.palette.error.main,
      },
      '&.success': {
        backgroundColor: theme.palette.success.main,
      },
      '& .MuiChip-label': {
        padding: '0 10px',
        lineHeight: '22px',
      },
    },
  }),
);

interface AlertChipProps {
  id: string;
  status: 'error' | 'success';
  text: string;
}

const AlertChip = React.memo(function AlertChip(props: AlertChipProps) {
  const classes = useStyles();
  return (
    <Chip
      id={props.id}
      data-testid={props.id}
      className={`${classes.alertChip} ${props.status}`}
      label={props.text}
    />
  );
});

export default AlertChip;

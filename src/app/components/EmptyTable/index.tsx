import * as React from 'react';
import { createStyles, makeStyles, Typography } from '@material-ui/core';
import { ReactComponent as EmptyBoxSvg } from '../../../assets/emptyBox.svg';

const useStyles = makeStyles(theme =>
  createStyles({
    emptyTableWrapper: {
      width: '100%',
      padding: '20px 0 30px 0',
      textAlign: 'center',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      '& .MuiTypography-root': {
        color: theme.palette.grey['600'],
      },
    },
  }),
);

interface EmptyTableProps {
  id: string;
  header: string;
  subheader?: string;
}

const EmptyTable = React.memo(function EmptyTable(props: EmptyTableProps) {
  const classes = useStyles();
  return (
    <div id={`${props.id}_wrapper`} className={classes.emptyTableWrapper}>
      <EmptyBoxSvg id={`${props.id}_image`} style={{ width: '300px' }} />
      <Typography id={`${props.id}_header`} component={'h1'} variant={'body1'}>
        {props.header}
      </Typography>
      <Typography id={`${props.id}_subheader`} component={'h2'} variant={'body2'}>
        {props.subheader}
      </Typography>
    </div>
  );
});

export default EmptyTable;

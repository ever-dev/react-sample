import React, { useState, useEffect } from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>
  createStyles({
    loadingWrapper: {
      display: 'block',
      width: '100%',
      height: '4px',
      position: 'fixed',
      top: '0',
      left: '0',
    },
    loadingIndicator: {
      opacity: 0,
      transition: 'opacity linear 500ms',
      backgroundColor: 'transparent',
      '& .MuiLinearProgress-barColorPrimary': {
        backgroundColor: theme.palette.brand.light,
      },
    },
    loadingVisible: {
      opacity: 1,
    },
  }),
);

export const LoadingIndicator = () => {
  const classes = useStyles();
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    const delayShowTimer = setTimeout(() => {
      setIsAnimating(true);
    }, 1250);
    return () => {
      setIsAnimating(false);
      clearTimeout(delayShowTimer);
    };
  }, []);

  return (
    <div className={classes.loadingWrapper}>
      <LinearProgress
        className={`${classes.loadingIndicator} ${isAnimating ? classes.loadingVisible : ''}`}
        variant={'indeterminate'}
      />
    </div>
  );
};

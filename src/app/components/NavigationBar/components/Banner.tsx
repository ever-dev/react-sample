import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import { ReactComponent as ReactBannerLogo } from 'assets/banner.svg';

const useStyles = makeStyles(theme =>
  createStyles({
    bannerSvgWrapper: {
      flex: '0 0 175px',
    },
  }),
);

const NavigationBarBanner = React.memo(function NavigationBarBanner() {
  const classes = useStyles();
  return (
    <div className={classes.bannerSvgWrapper}>
      <ReactBannerLogo title={'App'} />
    </div>
  );
});

export default NavigationBarBanner;

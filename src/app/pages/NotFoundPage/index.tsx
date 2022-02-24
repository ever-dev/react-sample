import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as ConfusedManSvg } from 'assets/EmptyPlane/confusedMan.svg';
import { ReactComponent as EmptyCargoPlaneSvg } from 'assets/EmptyPlane/emptyPlane.svg';
import { createStyles, makeStyles, Typography } from '@material-ui/core';
import { lang } from 'locales/translations';

const calcX = x => x - window.innerWidth / 2;
const calcY = y => y - window.innerHeight / 2;
const resistance = 2;
const trans1 = (x, y) =>
  `translate3d(${x / (resistance * 10)}px,${y / (resistance * 15) - 70}px,0)`;
const trans2 = (x, y) =>
  `translate3d(${-(x / (resistance * 30))}px,${-(y / (resistance * 30)) + 40}px,0)`;
const trans3 = (x, y) =>
  `translate3d(${-(x / (resistance * 15)) - 25}px,${-(y / (resistance * 20)) + 100}px,0)`;

const useStyles = makeStyles(theme =>
  createStyles({
    notFoundContainer: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& > *': {
        transition: 'transform 250ms ease-out',
      },
    },
    notFoundBackground: {
      backgroundColor: theme.palette.brand.light,
      position: 'absolute',
      height: '500px',
      width: '500px',
      borderRadius: '250px',
    },
    notFoundTextWrapper: {
      position: 'absolute',
      textAlign: 'center',
      '& .MuiTypography-root': {
        color: '#f5f5f5',
        '&.header': {
          fontSize: '8rem',
          lineHeight: '8rem',
        },
        '&.subheader': {
          fontSize: '2rem',
          lineHeight: '2rem',
          marginTop: '-1rem',
        },
      },
    },
    emptyCargoPlane: {
      position: 'absolute',
      width: '400px',
    },
    confusedMan: {
      position: 'absolute',
      width: '50px',
    },
  }),
);

export function NotFoundPage() {
  const classes = useStyles();
  const { t } = useTranslation();
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  return (
    <div
      className={classes.notFoundContainer}
      onMouseMove={({ clientX: x, clientY: y }) => setPosition({ x: calcX(x), y: calcY(y) })}
    >
      <div className={classes.notFoundBackground} />
      <div
        className={classes.emptyCargoPlane}
        style={{ transform: trans1(position.x, position.y) }}
      >
        <EmptyCargoPlaneSvg />
      </div>
      <div className={classes.confusedMan} style={{ transform: trans2(position.x, position.y) }}>
        <ConfusedManSvg />
      </div>
      <div
        className={classes.notFoundTextWrapper}
        style={{ transform: trans3(position.x, position.y) }}
      >
        <Typography component={'h1'} className={'header'}>
          {t(lang.not_found.header)}
        </Typography>
        <Typography component={'h2'} className={'subheader'}>
          {t(lang.not_found.subheader)}
        </Typography>
      </div>
    </div>
  );
}

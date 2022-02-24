import * as React from 'react';

import {
  Card,
  CardContent,
  Container,
  Typography,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';

const useCardStyles = makeStyles(() =>
  createStyles({
    authCardContent: {
      padding: '24px',
    },
  }),
);

export function AuthCard({ children }) {
  const classes = useCardStyles();
  return (
    <Container maxWidth={'xs'}>
      <Card>
        <CardContent className={classes.authCardContent}>{children}</CardContent>
      </Card>
    </Container>
  );
}

interface AuthHeaderProps {
  text: string;
  variant?: Variant | 'inherit';
}

export const AuthHeader = React.memo(function AuthHeader({ text, variant }: AuthHeaderProps) {
  return (
    <Typography
      variant={variant || 'h6'}
      component={'h1'}
      color={'textPrimary'}
      display={'block'}
      align={'center'}
      gutterBottom
    >
      {text}
    </Typography>
  );
});

const useSubheaderStyles = makeStyles(() =>
  createStyles({
    subheaderContainer: {
      display: 'block',
      margin: '8px 0',
    },
    subheaderWrapper: {
      width: '250px',
      margin: '0 auto',
    },
  }),
);

export const AuthSubheader = React.memo(function AuthSubheader({ text, variant }: AuthHeaderProps) {
  const classes = useSubheaderStyles();
  return (
    <div className={classes.subheaderContainer}>
      <div className={classes.subheaderWrapper}>
        <Typography
          variant={variant || 'body2'}
          component={'h2'}
          color={'textPrimary'}
          align={'center'}
        >
          {text}
        </Typography>
      </div>
    </div>
  );
});

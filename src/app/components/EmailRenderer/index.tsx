import * as React from 'react';
import { Link } from '@material-ui/core';

interface EmailRendererProps {
  email: string;
}

const EmailRenderer = React.memo(function EmailRenderer(props: EmailRendererProps) {
  return (
    <Link variant={'body2'} href={`mailto:${props.email}`}>
      {props.email}
    </Link>
  );
});

export default EmailRenderer;

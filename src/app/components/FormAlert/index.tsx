import * as React from 'react';
import { Alert } from '@material-ui/lab';

interface FormAlertProps {
  severity: 'success' | 'warning' | 'error' | 'info';
  children: any;
  marginTop?: string;
  marginBottom?: string;
}

const FormAlert = React.memo(function FormAlert(props: FormAlertProps) {
  return (
    <div
      style={{
        marginTop: props.marginTop || '16px',
        marginBottom: props.marginBottom || '8px',
      }}
    >
      <Alert severity={props.severity}>{props.children}</Alert>
    </div>
  );
});

export default FormAlert;

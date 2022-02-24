import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { ThemeProvider } from 'styles/theme/ThemeProvider';
import AlertChip from '../index';

const renderAlertChip = (status: 'error' | 'success') =>
  render(
    <ThemeProvider>
      <AlertChip id={'alert_chip_test'} text={'Test'} status={status} />
    </ThemeProvider>,
  );

describe('<FormAlert />', () => {
  let formAlert: RenderResult;

  it('should render error chip', () => {
    formAlert = renderAlertChip('error');
    expect(formAlert.getByText('Test')).toBeInTheDocument();
    expect(formAlert.getByTestId('alert_chip_test')).toHaveClass('error');
  });

  it('should render success chip', () => {
    formAlert = renderAlertChip('success');
    expect(formAlert.getByText('Test')).toBeInTheDocument();
    expect(formAlert.getByTestId('alert_chip_test')).toHaveClass('success');
  });
});

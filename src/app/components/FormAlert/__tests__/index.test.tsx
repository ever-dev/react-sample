import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { ThemeProvider } from '../../../../styles/theme/ThemeProvider';
import FormAlert from '../index';

const renderFormAlert = () =>
  render(
    <ThemeProvider>
      <FormAlert severity={'info'}>Test</FormAlert>
    </ThemeProvider>,
  );

describe('<FormAlert />', () => {
  let formAlert: RenderResult;

  beforeEach(() => {
    formAlert = renderFormAlert();
  });

  it('should render children components', () => {
    expect(formAlert.getByText('Test')).toBeInTheDocument();
  });
});

import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { ThemeProvider } from '../../../../styles/theme/ThemeProvider';
import EmailRenderer from '../index';

const renderEmailRenderer = () =>
  render(
    <ThemeProvider>
      <EmailRenderer email={'test@mail.com'} />
    </ThemeProvider>,
  );

describe('<EmailRenderer />', () => {
  let EmailRenderer: RenderResult;

  beforeEach(() => {
    EmailRenderer = renderEmailRenderer();
  });

  it('should render email text', () => {
    expect(EmailRenderer.getByText('test@mail.com')).toBeInTheDocument();
  });

  it('should have link to email', () => {
    expect(EmailRenderer.getByText('test@mail.com')).toHaveAttribute(
      'href',
      'mailto:test@mail.com',
    );
  });
});

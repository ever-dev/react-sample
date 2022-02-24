import * as React from 'react';
import { NotFoundPage } from '../index';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../../../../styles/theme/ThemeProvider';

import t from 'locales/en-US/translation.json';

const renderNotFoundPage = () =>
  render(
    <ThemeProvider>
      <NotFoundPage />
    </ThemeProvider>,
  );

describe('<NotFoundPage />', () => {
  it('should render not found message', () => {
    const notFoundPage = renderNotFoundPage();
    const header: any = notFoundPage.queryByText(t.not_found.header);
    const subheader: any = notFoundPage.queryByText(t.not_found.subheader);
    expect(header).toBeInTheDocument();
    expect(subheader).toBeInTheDocument();
  });
});

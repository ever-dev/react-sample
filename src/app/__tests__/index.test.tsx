import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { RenderResult } from '@testing-library/react';
import { Store } from '@reduxjs/toolkit';
import { configureAppStore } from 'store/configureStore';
import { ThemeProvider } from 'styles/theme/ThemeProvider';
import { Layout } from 'app/layout';
import { asyncRender } from 'utils/testUtils';

const renderLayout = (store: Store, pathName: string) =>
  asyncRender(
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter initialEntries={[pathName]}>
          <Layout>
            <div>Content</div>
          </Layout>
        </MemoryRouter>
      </ThemeProvider>
    </Provider>,
  );

describe('<Layout />', () => {
  let store: ReturnType<typeof configureAppStore>;
  let layoutPage: RenderResult;

  beforeEach(() => {
    store = configureAppStore();
  });

  describe('Auth routes', () => {
    beforeEach(async () => {
      layoutPage = await renderLayout(store, '/login');
    });

    it('should render auth background', () => {
      const authBgImage: any = layoutPage.getByTestId('auth-bg');
      expect(authBgImage).toBeInTheDocument();
    });

    it('should NOT render navigation bar', () => {
      const navBar: any = layoutPage.queryByTestId('app-nav-bar');
      expect(navBar).not.toBeInTheDocument();
    });
  });

  describe('App routes', () => {
    beforeEach(async () => {
      layoutPage = await renderLayout(store, '/organizations');
    });

    it('should NOT render auth background', () => {
      const authBgImage: any = layoutPage.queryByTestId('auth-bg');
      expect(authBgImage).not.toBeInTheDocument();
    });

    it('should render navigation bar', () => {
      const navBar: any = layoutPage.queryByTestId('app-nav-bar');
      expect(navBar).toBeInTheDocument();
    });
  });

  describe('Unknown/invalid routes', () => {
    beforeEach(async () => {
      layoutPage = await renderLayout(store, '/bwah?');
    });

    it('should NOT render auth background', () => {
      const authBgImage: any = layoutPage.queryByTestId('auth-bg');
      expect(authBgImage).not.toBeInTheDocument();
    });

    it('should NOT render navigation bar', () => {
      const navBar: any = layoutPage.queryByTestId('app-nav-bar');
      expect(navBar).not.toBeInTheDocument();
    });
  });
});

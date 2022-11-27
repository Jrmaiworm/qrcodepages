import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Page from './page';
import PageDetail from './page-detail';
import PageUpdate from './page-update';
import PageDeleteDialog from './page-delete-dialog';

const PageRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Page />} />
    <Route path="new" element={<PageUpdate />} />
    <Route path=":id">
      <Route index element={<PageDetail />} />
      <Route path="edit" element={<PageUpdate />} />
      <Route path="delete" element={<PageDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default PageRoutes;

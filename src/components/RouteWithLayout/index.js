import React from 'react';
import T from 'prop-types';
import { Route } from 'react-router-dom';

import AppLayout from 'containers/AppLayout';

const RouteWithLayout = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <AppLayout>
        <Component {...props} />
      </AppLayout>
    )}
  />
);

RouteWithLayout.propTypes = {
  component: T.func.isRequired,
};

export default RouteWithLayout;

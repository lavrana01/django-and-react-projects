import React from 'react';
import { Route,Routes, Navigate } from 'react-router-dom';
import { isAuthenticated } from './index';
import { UserDashboard } from '../../user/UserDashboard';

export default function PrivateRoutes({ component: Component, ...rest }) {
  return (
    <Routes>
    <Route
      {...rest}
      element={(props) =>
        isAuthenticated() ? (
          <UserDashboard {...props} />
        ) : (
          <>
            <Navigate
              to="/signin"
              state={{ from: props.location }}
            />
          </>
        )
      }
    />
    </Routes>
  );
  
}

import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate} from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { token } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) => (token ? <Component {...props} /> : <Navigate  to="/login" />)}
    />
  )
}

export default ProtectedRoute

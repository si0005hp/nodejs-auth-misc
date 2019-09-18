import React, { useEffect } from 'react';
import Auth0Lock from 'auth0-lock';

const auth0Lock = new Auth0Lock(
  process.env.AUTH0_CLIENTID || '',
  process.env.AUTH0_DOMAIN || '',
  {
    container: 'show-auth',
    closable: false,
    auth: {
      responseType: 'token id_token',
      redirectUrl: 'http://localhost:8088' + '/callback',
      params: {
        scope: 'openid profile email'
      }
    }
  }
);

const Login = () => {
  useEffect(() => {
    auth0Lock.show();
  });
  return <div id="show-auth" />;
};

export default Login;

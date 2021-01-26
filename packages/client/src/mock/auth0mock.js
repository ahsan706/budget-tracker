import React from 'react';
const auth0Mock = {
  useAuth0: () => {
    return {
      isAuthenticated: true,
      user: {},
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    };
  },
  Auth0Provider: (opts) => {
    const test = <div>{opts.children}</div>;
    return test;
  }
};
export { auth0Mock };

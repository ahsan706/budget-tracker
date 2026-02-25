import React from 'react';
const auth0Mock = {
  useAuth0: () => {
    return {
      isAuthenticated: true,
      user: {},
      logout: vi.fn(),
      loginWithRedirect: vi.fn()
    };
  },
  Auth0Provider: (opts) => {
    const test = <div>{opts.children}</div>;
    return test;
  }
};
export { auth0Mock };

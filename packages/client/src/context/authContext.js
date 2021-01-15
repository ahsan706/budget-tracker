import React, { useContext } from 'react';
const auth = {
  isAuth: false,
  signIn: () => {
    auth.isAuth = true;
  },
  signOut: () => {
    auth.isAuth = false;
  }
};
const authContext = React.createContext(auth);
export default authContext;
export const useAuthContext = () => {
  return useContext(authContext);
};

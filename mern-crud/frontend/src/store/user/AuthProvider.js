import axios from 'axios';
import { useCallback, useEffect, useReducer, useState } from 'react';
import { useHistory } from 'react-router';
import AuthContext from './AuthContext';

let logoutTimer;

const AuthProvider = (props) => {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(false);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();    
    const [userId, setUserId] = useState(false);
    const history = useHistory();
    // const login = uid => {
    //   setIsLoggedIn(true);
    //   setUserId(uid);
    // };
    const login = useCallback((uid, token, expirationDate) => {
      setToken(token);
      setUserId(uid);
      // console.log('****** inside  login ', uid, ' -- ', token);
      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirationDate(tokenExpirationDate);
      localStorage.setItem(
        'userData',
        JSON.stringify({
          userId: uid,
          token: token,
          expiration: tokenExpirationDate.toISOString()
        })
      );
    }, []);

    const logout = useCallback(() => {
      setToken(null);
      setTokenExpirationDate(null);
      setUserId(null);
      localStorage.removeItem('userData');
      history.push("/books");
    }, [history]);

    useEffect(() => {
      if (token && tokenExpirationDate) {
        const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
        logoutTimer = setTimeout(logout, remainingTime);
      } else {
        clearTimeout(logoutTimer);
      }
    }, [token, logout, tokenExpirationDate]);
  
    useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem('userData'));
      // console.log('****** get storedData ', storedData);
      if (
        storedData &&
        storedData.token &&
        new Date(storedData.expiration) > new Date()
      ) {
        login(storedData.userId, storedData.token, new Date(storedData.expiration));
      }
    }, [login]);

    const authContext = {
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
    };

    return (
      <AuthContext.Provider value={authContext}>
        {props.children}
      </AuthContext.Provider>
    );
  };
  
  export default AuthProvider;
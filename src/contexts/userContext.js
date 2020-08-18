import React, { createContext } from 'react';
import { useCookies } from 'react-cookie';

export const UserContext = createContext();

function UserContextProvider(props) {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const [userData, setUserData] = useState([]);

  const [cookie, setCookie, removeCookie] = useCookies(['isLoggedIn']);
  const [cookies, setCookies, removeCookies] = useCookies(['userData']);

  const logOut = () => {
    removeCookie('isLoggedIn');
    removeCookies('userData');
  };

  return (
    <div>
      <UserContext.Provider
        value={{ cookie, setCookie, cookies, setCookies, logOut }}>
        {props.children}
      </UserContext.Provider>
    </div>
  );
}

export default UserContextProvider;

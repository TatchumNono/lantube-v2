import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

function UserContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState([]);

  const logOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      <UserContext.Provider
        value={{ isLoggedIn, setIsLoggedIn, userData, setUserData, logOut }}>
        {props.children}
      </UserContext.Provider>
    </div>
  );
}

export default UserContextProvider;

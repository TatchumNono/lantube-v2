import React, { useContext } from 'react';
import Navbar from '../Navbar/Navbar';
import NavBarAuth from '../Navbar/NavbarAuth';
import { UserContext } from '../../contexts/userContext';

const Nav = () => {
  const { cookie } = useContext(UserContext);
  return <div>{cookie.isLoggedIn ? <NavBarAuth /> : <Navbar />}</div>;
};

export default Nav;

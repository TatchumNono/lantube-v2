import React, { useContext } from 'react';
import Navbar from '../Navbar/Navbar';
import NavBarAuth from '../Navbar/NavbarAuth';
import { UserContext } from '../../contexts/userContext';

export default function Nav() {
  const { cookie } = useContext(UserContext);
  return <div>{cookie.isLoggedIn ? <NavBarAuth /> : <Navbar />}</div>;
}

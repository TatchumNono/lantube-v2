import React, { useContext } from 'react';
import Navbar from './Navbar/Navbar';
import NavBarAuth from './Navbar/NavbarAuth';
import { UserContext } from '../contexts/userContext';

function Home() {
  const { cookie } = useContext(UserContext);

  return (
    <div>
      {cookie.isLoggedIn ? <NavBarAuth /> : <Navbar />}
      <p>Home</p>
    </div>
  );
}

export default Home;

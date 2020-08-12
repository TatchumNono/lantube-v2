import React, { useContext } from 'react';
import NavBarAuth from '../Navbar/NavbarAuth';
import { UserContext } from '../../contexts/userContext';
import SimpleModal from '../modal/Verification';
import SubUpload from './SubUpload';

export default function Upload() {
  const { cookie } = useContext(UserContext);
  return (
    <div>
      {!cookie.isLoggedIn ? (
        <div>
          <SimpleModal />
          <p>Login first</p>
        </div>
      ) : (
        <div>
          <NavBarAuth />
          <SubUpload />
        </div>
      )}
    </div>
  );
}

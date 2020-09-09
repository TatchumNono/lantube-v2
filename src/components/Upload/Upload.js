import React, { useContext } from 'react';
import NavBarAuth from '../Navbar/NavbarAuth';
import { UserContext } from '../../contexts/userContext';
import SimpleModal from '../modal/Verification';
import SubUpload from './SubUpload';

const Upload = () => {
  const { cookie } = useContext(UserContext);
  return (
    <div>
      {!cookie.isLoggedIn ? (
        <div>
          <SimpleModal />
        </div>
      ) : (
        <div>
          <NavBarAuth />
          <SubUpload />
        </div>
      )}
    </div>
  );
};

export default Upload;

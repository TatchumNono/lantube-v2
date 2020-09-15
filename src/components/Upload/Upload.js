import React, { useContext,useState } from 'react';
import NavBarAuth from '../Navbar/NavbarAuth';
import { UserContext } from '../../contexts/userContext';
import SimpleModal from '../modal/Verification';
import SubUpload from './SubUpload';

const Upload = () => {
  const file_categories = ["film","music","tutorial","other"] 
  const { cookie } = useContext(UserContext);
  return (
    <div>
      {cookie.isLoggedIn ? (
        <div>
          <SimpleModal />
        </div>
      ) : (
        <div>
          <SubUpload categories={file_categories} />
        </div>
      )}
    </div>
  );
};

export default Upload;

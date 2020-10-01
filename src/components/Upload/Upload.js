import React, { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import Verification from '../modal/Verification';
import SubUpload from './SubUpload';

const Upload = () => {
  const file_categories = ["film","music","tutorial","other"] 
  const { cookie } = useContext(UserContext);
  return (
    <div>
      {cookie.isLoggedIn ? (
        <div>
          <Verification />
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

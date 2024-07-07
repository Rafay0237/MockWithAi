"use client"

import { useSelector} from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PrivateRoute = ({ children }) => {
  const currentUser= useSelector((state) => state.currentUser);
  const router = useRouter();
  
  useEffect(() => {
      if (!currentUser) {
          router.push('/sign-in'); 
        }
  }, [currentUser,router]);

  return currentUser ? <>{children}</> : null;
};

export default PrivateRoute;

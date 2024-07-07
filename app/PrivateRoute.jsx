"use client"

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import React from 'react';

const PrivateRoute = ({ children }) => {
  const user= useSelector(state => state.user);
  const currentUser=user?.currentUser
  const router = useRouter();
  
//   useEffect(() => {
//       if (!currentUser) {
//           router.push('/sign-in'); 
//         }
//   }, [currentUser,router]);

  return currentUser ? <>{children}</> : null;
};

export default PrivateRoute;

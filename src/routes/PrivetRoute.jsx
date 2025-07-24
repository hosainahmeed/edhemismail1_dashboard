import React from 'react';
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useGetProfileDataQuery } from '../Redux/services/profileApis.jsx';
const PrivateRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { data, isLoading: isProfileLoading } = useGetProfileDataQuery();
  useEffect(() => {
    const checkAuthorization = () => {
      const role = data?.data?.user?.role;
      try {
        if (role === 'superAdmin') {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error('Authorization check failed:', error);
        setIsAuthorized(false);
      }
    };

    if (!isProfileLoading) {
      checkAuthorization();
      setIsLoading(false);
    }
  }, [data?.data?.role, isProfileLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <span className="loader-black"></span>
      </div>
    );
  }

  return isAuthorized ? (
    children
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;

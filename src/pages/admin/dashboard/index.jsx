import React from 'react';
import DashboardPage from './dashboard';
import { useUserContext } from '../../../providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import withAuthentication from '../../../hoc/authenticated';

const AdminDashboard = withAuthentication(() => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user.labels.includes('ORG')) {
      navigate('/login');
      return;
    }
  }, [user]);

  return <DashboardPage />;
}, false);

export default AdminDashboard;

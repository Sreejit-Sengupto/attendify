import React from 'react';
import DashboardPage from './dashboard';
import withAuthentication from '../../hoc/authenticated';
import { useUserContext } from '../../providers/UserProvider';
import { useNavigate } from 'react-router-dom';

const Dashboard = withAuthentication(() => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user.labels.includes('STD')) {
      navigate('/login');
      return;
    }
  }, [user]);

  return <DashboardPage />;
}, false);

export default Dashboard;

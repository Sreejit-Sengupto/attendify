import DashboardPage from './dashboard';
import withAuthentication from '../../hoc/authenticated';

const Dashboard = withAuthentication(DashboardPage, false);

export default Dashboard;

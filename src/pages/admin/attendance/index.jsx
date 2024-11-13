import Attendence from './components/attendence';
import withAuthentication from '../../../hoc/authenticated';

const AttendancePage = withAuthentication(Attendence, false);

export default AttendancePage;

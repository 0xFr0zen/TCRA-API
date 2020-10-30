import userControlls from './user';
import session from './session';
/**
 * All-Routes
 */
const Routes = [
  ...session,
  ...userControlls,
];
export default Routes;

import userControlls from './user';
import session from './session';
import redeems from './redeems';
import commands from './commands';
/**
 * All-Routes
 */
const Routes = [...session, ...userControlls, ...redeems, ...commands];
export default Routes;

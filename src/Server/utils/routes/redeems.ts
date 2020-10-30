import { RedeemController } from '../../orm/controller/RedeemController';
import IRouteConfig from '../interfaces/RouteConfig';
/**
 * User-Routes
 */
export default [
  {
    method: 'get',
    route: '/u(ser)?/:uid/r(edeem)?s',
    controller: RedeemController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/u(ser)?/:uid/r(edeem)/:rid',
    controller: RedeemController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/u(ser)?/:uid/r(edeem)',
    controller: RedeemController,
    action: 'create',
  },
  {
    method: 'put',
    route: '/u(ser)?/:uid/r(edeem)/:rid',
    controller: RedeemController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/u(ser)?/:uid/r(edeem)/:rid',
    controller: RedeemController,
    action: 'remove',
  },
] as Array<IRouteConfig>;

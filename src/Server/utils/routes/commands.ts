import { CommandController } from '../../orm/controller/CommandController';
import IRouteConfig from '../interfaces/RouteConfig';
/**
 * User-Routes
 */
export default [
  {
    method: 'get',
    route: '/u(ser)?/:uid/c(ommand)?s',
    controller: CommandController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/u(ser)?/:uid/c(ommand)?/:cid',
    controller: CommandController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/u(ser)?/:uid/c(ommand)?',
    controller: CommandController,
    action: 'create',
  },
  {
    method: 'put',
    route: '/u(ser)?/:uid/c(ommand)?/:cid',
    controller: CommandController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/u(ser)?/:uid/c(ommand)?:cid',
    controller: CommandController,
    action: 'remove',
  },
] as Array<IRouteConfig>;

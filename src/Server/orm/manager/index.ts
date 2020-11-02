import { Request } from 'express';
import { Connection, Repository } from 'typeorm';
import { User } from '../entities/User';
import Errors from '../../utils/messages/errors';
import IParamOrBody from '../../utils/interfaces/ParamOrBody/index';
import { EntityType } from '../../utils/types/Entities';
import { hasValidParameters } from '../../utils/Validation';
import IEntities from '../../utils/interfaces/Entities';
import { Redeem } from '../entities/Redeem';
import { Command } from '../entities/Command';

/**
 * EntityManager Class
 *
 * Simplifes the Connectivity for the Controllers
 */
export default class EntityManager {
  /**
   * User-Repository from `typeorm->connection->getRepository()`
   */
  private static userRepository: Repository<User>;
  private static redeemRepository: Repository<Redeem>;
  private static commandRepository: Repository<Command>;

  /**
   * Initalizes the Repositories
   * @param connection Given Connection from TypeORM
   */
  public static init = async (connection: Connection) => {
    console.log('waiting for stable connection');
    if (connection.isConnected) {
      await (() => new Promise((resolve) => setTimeout(resolve, 100)))();
      console.log('Loading repos');
      EntityManager.userRepository = connection.getRepository(User);
      EntityManager.redeemRepository = connection.getRepository(Redeem);
      EntityManager.commandRepository = connection.getRepository(Command);
    }
  };

  /**
   * Gets the user from the Database via Repository
   * @param request Request
   */
  private static getUser = async (
    request: Request | IParamOrBody
  ): Promise<User> =>
    new Promise(async (resolve, reject) => {
      try {
        hasValidParameters('params', request, 'user');
        const num = isNaN(Number(request.params.uid))
          ? -1
          : Number(request.params.uid);
        const user = await EntityManager.userRepository
          .createQueryBuilder()
          .where(`id = :uid`, { uid: num })
          .orWhere(`name = :uname`, { uname: request.params.uid })
          .getOne();
        if (!user) {
          return reject(Errors.USER_DOES_NOT_EXIST);
        }
        return resolve(user);
      } catch (error) {
        return reject(error);
      }
    });

  /**
   * Gets the Redeem from the Database via Repository
   * @param request Request
   */
  private static getRedeem = async (
    request: Request | IParamOrBody
  ): Promise<Redeem> =>
    new Promise(async (resolve, reject) => {
      try {
        hasValidParameters('params', request, 'redeem');
        const num = isNaN(Number(request.params.rid))
          ? -1
          : Number(request.params.rid);
        const user = await EntityManager.redeemRepository
          .createQueryBuilder()
          .where(`id = :rid`, { rid: num })
          .orWhere(`name = :rname`, { rname: request.params.rid })
          .getOne();
        if (!user) {
          return reject(Errors.REDEEM_DOES_NOT_EXIST);
        }
        return resolve(user);
      } catch (error) {
        return reject(error);
      }
    });
  /**
   * Gets the Command from the Database via Repository
   * @param request Request
   */
  private static getCommand = async (
    request: Request | IParamOrBody
  ): Promise<Command> =>
    new Promise(async (resolve, reject) => {
      try {
        hasValidParameters('params', request, 'command');
        const num = isNaN(Number(request.params.cid))
          ? -1
          : Number(request.params.cid);
        const user = await EntityManager.commandRepository
          .createQueryBuilder()
          .where(`id = :cid`, { cid: num })
          .orWhere(`name = :cname`, { cname: request.params.cid })
          .getOne();
        if (!user) {
          return reject(Errors.COMMAND_DOES_NOT_EXIST);
        }
        return resolve(user);
      } catch (error) {
        return reject(error);
      }
    });
  /**
   * Records of fastened-functions (Repository-access, premade)
   */
  private static records: Record<
    EntityType,
    (request: Request | IParamOrBody) => Promise<any>
  > = {
    user: async (request): Promise<User> =>
      new Promise(async (resolve, reject) => {
        try {
          return resolve((await EntityManager.getUser(request)) as User);
        } catch (error) {
          return reject(error);
        }
      }),
    redeem: async (request): Promise<Redeem> =>
      new Promise(async (resolve, reject) => {
        try {
          return resolve((await EntityManager.getRedeem(request)) as Redeem);
        } catch (error) {
          return reject(error);
        }
      }),
    command: async (request): Promise<Command> =>
      new Promise(async (resolve, reject) => {
        try {
          return resolve((await EntityManager.getCommand(request)) as Command);
        } catch (error) {
          return reject(error);
        }
      }),
  };

  /**
   * Gets a Entity from the Database via Repository
   * @param request Request
   */
  public static getEntity = async (
    request: Request | IParamOrBody,
    which: string
  ): Promise<any> =>
    new Promise(async (resolve, reject) => {
      let entities: IEntities = {};
      try {
        return resolve(await EntityManager.records[which](request));
      } catch (error) {
        return reject(error);
      }
    });
}

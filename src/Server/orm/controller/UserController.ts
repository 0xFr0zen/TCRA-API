import * as argon2 from 'argon2';
import { NextFunction, Request, Response } from 'express';
import { DeepPartial, getRepository } from 'typeorm';
import Errors from '../../utils/messages/errors';
import EntityManager from '../manager';
import { hasValidParameters } from '../../utils/Validation';
import { Controller } from '../controller/AbstractController';
import { User } from '../entities/User';

export class UserController extends Controller {
  private userRepository = getRepository(User);

  /**
   * Get all Users
   * @param request Request
   * @param response Response
   * @param next Next
   */
  async all(request: Request, response: Response, next: NextFunction) {
    const users: User[] = <User[]>await this.userRepository.find();
    return users;
  }

  /**
   * Login Users
   * @param request Request
   * @param response Response
   * @param next Next
   */
  async login(request: Request, response: Response, next: NextFunction) {
    try {
      hasValidParameters('params', request, 'user');
      hasValidParameters('body', request, 'user:login');
      const u = await this.userRepository
        .createQueryBuilder()
        .where(`id = :uid`, { uid: Number(request.params.uid) })
        .orWhere(`name = :uid`, { uid: request.params.uid })
        .andWhere(`email = :email`, { email: request.body.email })
        .addSelect('User.password')
        .getOne();
      const loggedin = await argon2.verify(u.password, request.body.password);
      return { loggedin };
    } catch (error) {
      return error;
    }
  }

  /**
   * Get one User
   * @param request Request
   * @param response Response
   * @param next Next
   */
  async one(request: Request, response: Response, next: NextFunction) {
    try {
      return <User>await EntityManager.getEntity(request, 'user');
    } catch (error) {
      return error;
    }
  }

  /**
   * Save User with `request.body`
   * @param request Request
   * @param response Response
   * @param next Next
   */
  async save(request: Request, response: Response, next: NextFunction) {
    try {
      hasValidParameters('body', request, 'user');
      let u = <User>await EntityManager.getEntity(request, 'user');
      let b = request.body as DeepPartial<User>;
      b.password = await argon2.hash(b.password);
      await this.userRepository.update({ id: u.id }, b);
      return <User>await EntityManager.getEntity(request, 'user');
    } catch (error) {
      return error;
    }
  }

  /**
   * Remove User
   * @param request Request
   * @param response Response
   * @param next Next
   */
  async remove(request: Request, response: Response, next: NextFunction) {
    return await this.userRepository.remove(
      <User>await EntityManager.getEntity(request, 'user')
    );
  }

  /**
   * Create User (optional with `request.body`)
   * @param request Request
   * @param response Response
   * @param next Next
   */
  async create(request: Request, response: Response, next: NextFunction) {
    hasValidParameters('body', request, 'user');
    let b = request.body as DeepPartial<User>;
    b.password = await argon2.hash(b.password);

    let u: User;
    try {
      u = <User>(
        await this.userRepository.save(await this.userRepository.create(b))
      );
    } catch (error) {
      return Errors.USER_EXISTS_ALREADY;
    }
    return <User>(
      await EntityManager.getEntity({ params: { uid: `${u.id}` } }, 'user')
    );
  }
}

import * as argon2 from 'argon2';
import { NextFunction, Request, Response } from 'express';
import { DeepPartial, getRepository } from 'typeorm';
import Errors from '../../utils/messages/errors';
import EntityManager from '../manager';
import { hasValidParameters } from '../../utils/Validation';
import { Controller } from './AbstractController';
import { User } from '../entities/User';
// import { Redeem } from '../entities/Redeem';
import { Command } from '../entities/Command';

export class CommandController extends Controller {
  private commandRepository = getRepository(Command);

  /**
   * Get all Commands
   * @param request Request
   * @param response Response
   * @param next Next
   */
  async all(request: Request, response: Response, next: NextFunction) {
    const redeems: Command[] = <Command[]>await this.commandRepository.find();
    return redeems;
  }

  /**
   * Get one Commands
   * @param request Request
   * @param response Response
   * @param next Next
   */
  async one(request: Request, response: Response, next: NextFunction) {
    try {
      hasValidParameters('params', request, 'command');

      return <Command>await EntityManager.getEntity(request, 'command');
    } catch (error) {
      return error;
    }
  }

  /**
   * Save Commands with `request.body`
   * @param request Request
   * @param response Response
   * @param next Next
   */
  async save(request: Request, response: Response, next: NextFunction) {
    try {
      hasValidParameters('body', request, 'command');
      let u = <Command>await EntityManager.getEntity(request, 'command');
      await this.commandRepository.update(
        { id: u.id },
        request.body as DeepPartial<Command>
      );
      return <Command>await EntityManager.getEntity(request, 'command');
    } catch (error) {
      return error;
    }
  }

  /**
   * Remove Commands
   * @param request Request
   * @param response Response
   * @param next Next
   */
  async remove(request: Request, response: Response, next: NextFunction) {
    return await this.commandRepository.remove(
      <Command>await EntityManager.getEntity(request, 'command')
    );
  }

  /**
   * Create Commands (optional with `request.body`)
   * @param request Request
   * @param response Response
   * @param next Next
   */
  async create(request: Request, response: Response, next: NextFunction) {
    hasValidParameters('body', request, 'command');
    let b = request.body as DeepPartial<Command>;
    let w = { name: request.params.uid } as DeepPartial<User>;
    let n = Number(request.params.uid);
    if (!isNaN(n)) {
      w = { id: n };
    }
    console.log(w);
    const ownerid = (await User.findOne({ where: w })).id;
    b.owner = ownerid;

    let c: Command;
    try {
      c = <Command>(
        await this.commandRepository.save(
          await this.commandRepository.create(b)
        )
      );
    } catch (error) {
      return Errors.COMMAND_EXISTS_ALREADY;
    }
    return <Command>(
      await EntityManager.getEntity(
        { params: { uid: `${ownerid}`, cid: `${c.id}` } },
        'command'
      )
    );
  }
}

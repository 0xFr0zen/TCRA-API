import * as argon2 from 'argon2';
import { NextFunction, Request, Response } from 'express';
import { DeepPartial, getRepository } from 'typeorm';
import Errors from '../../utils/messages/errors';
import EntityManager from '../manager';
import { hasValidParameters } from '../../utils/Validation';
import { Controller } from '../controller/AbstractController';
import { User } from '../entities/User';
import { Redeem } from '../entities/Redeem';

export class RedeemController extends Controller {
  private redeemRepository = getRepository(Redeem);

  /**
   * Get all Redeems
   * @param request Request
   * @param response Response
   * @param next Next
   */
  async all(request: Request, response: Response, next: NextFunction) {
    const redeems: Redeem[] = <Redeem[]>await this.redeemRepository.find();
    return redeems;
  }

  /**
   * Get one Redeem
   * @param request Request
   * @param response Response
   * @param next Next
   */
  async one(request: Request, response: Response, next: NextFunction) {
    try {
      return <Redeem>await EntityManager.getEntity(request, 'redeem');
    } catch (error) {
      return error;
    }
  }

  /**
   * Save Redeem with `request.body`
   * @param request Request
   * @param response Response
   * @param next Next
   */
  async save(request: Request, response: Response, next: NextFunction) {
    try {
      hasValidParameters('body', request, 'redeem');
      let u = <Redeem>await EntityManager.getEntity(request, 'redeem');
      await this.redeemRepository.update(
        { id: u.id },
        request.body as DeepPartial<Redeem>
      );
      return <Redeem>await EntityManager.getEntity(request, 'redeem');
    } catch (error) {
      return error;
    }
  }

  /**
   * Remove Redeem
   * @param request Request
   * @param response Response
   * @param next Next
   */
  async remove(request: Request, response: Response, next: NextFunction) {
    return await this.redeemRepository.remove(
      <Redeem>await EntityManager.getEntity(request, 'redeem')
    );
  }

  /**
   * Create Redeem (optional with `request.body`)
   * @param request Request
   * @param response Response
   * @param next Next
   */
  async create(request: Request, response: Response, next: NextFunction) {
    hasValidParameters('body', request, 'redeem');
    let b = request.body as DeepPartial<Redeem>;

    let w = { name: request.params.uid } as DeepPartial<User>;
    let n = Number(request.params.uid);
    if (!isNaN(n)) {
      w = { id: n };
    }
    const userid = (await User.findOne({ where: w })).id;
    b.user = userid;
    let r: Redeem;
    try {
      r = <Redeem>(
        await this.redeemRepository.save(await this.redeemRepository.create(b))
      );
    } catch (error) {
      return Errors.REDEEM_EXISTS_ALREADY;
    }
    return <Redeem>(
      await EntityManager.getEntity(
        { params: { uid: `${userid}`, rid: `${r.id}` } },
        'redeem'
      )
    );
  }
}

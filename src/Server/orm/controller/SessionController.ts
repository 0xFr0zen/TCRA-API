import { NextFunction, Request, Response } from 'express';
import { DeepPartial, getRepository } from 'typeorm';
import { Session } from '../entities/Session';
import dayjs from 'dayjs';
import Errors from '../../utils/messages/errors/index';
import { User } from '../entities/User';
export class SessionController {
  private sessionRepository = getRepository(Session);
  private userRepository = getRepository(User);
  private static SESSION_HOLDING_TIME: number = 14;
  private static SESSION_HOLDING_FORMAT: dayjs.OpUnitType = 'day';

  /**
   * Checks if given Session is valid
   * @param request Request
   * @param response Response
   * @param next Next
   */
  async check(request: Request, response: Response, next: NextFunction) {
    try {
      let sessionhash = <string>request.header('trca-session') ?? undefined;
      let session: Session;

      // No session available
      if (!sessionhash) {
        // Get the Session-Objekt
        session = await this.sessionRepository.findOne({
          where: {
            ip: request.ip,
          },
        });
        // create session
        if (!session) {
          session = await this.sessionRepository.create({
            hash: await this.create(),
            ip: request.ip,
            expiresAt: dayjs()
              .add(
                SessionController.SESSION_HOLDING_TIME,
                SessionController.SESSION_HOLDING_FORMAT
              )
              .toDate(),
          });
          await this.sessionRepository.save(session);
        }
      } else {
        // Get the Session-Object
        session = await this.sessionRepository.findOne({
          where: {
            hash: sessionhash,
            ip: request.ip,
          },
        });
      }
      if (!session) throw Errors.SESSION_EXPIRED;
      if (
        dayjs(session.expiresAt).diff(
          session.createdAt,
          SessionController.SESSION_HOLDING_FORMAT
        ) > SessionController.SESSION_HOLDING_TIME
      )
        throw Errors.SESSION_EXPIRED;

      await this.sessionRepository.update({ id: session.id }, {});
      // await this.sessionRepository.save(session);

      response.header('trca-session', session.hash);
      return next();
    } catch (error) {
      return error;
    }
  }

  /**
   * Creates Session
   */
  private async create(length: number = 32): Promise<string> {
    const characters: string =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-,#*+.';

    let result: string = '';
    let s;
    do {
      result = '';
      for (let i: number = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }

      s =
        (await this.sessionRepository.findOne({ where: { hash: result } })) !==
        null;
    } while (!s);
    return result;
  }
}

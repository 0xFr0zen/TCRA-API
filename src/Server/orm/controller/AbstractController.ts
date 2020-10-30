import { NextFunction, Request, Response } from 'express';

/**
 * Abstract Controller Class
 */
export abstract class Controller {
  /**
   * Get All Entities
   * @param request Request
   * @param response Response
   * @param next Next
   */
  abstract async all(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any>;

  /**
   * Get One Entity
   * @param request Request
   * @param response Response
   * @param next Next
   */
  abstract async one(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any>;

  /**
   * Save Entity with request.body
   * @param request Request
   * @param response Response
   * @param next Next
   */
  abstract async save(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any>;

  /**
   * Create Entity (optional with request.body)
   * @param request Request
   * @param response Response
   * @param next Next
   */
  abstract async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any>;

  /**
   * Remove Entity
   * @param request Request
   * @param response Response
   * @param next Next
   */
  abstract async remove(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<any>;
}

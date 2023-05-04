import { type NextFunction, type Request, type Response } from 'express';
import { type ObjectSchema } from 'joi';

export const checkDtoFit =
  (dtoSchema: ObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await dtoSchema.validateAsync(req.body);
      next();
    } catch (err) {
      res.status(400).json({ err: true, message: (err as Error).message });
    }
  };

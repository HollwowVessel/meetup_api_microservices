import { type Response } from 'express';

import { type Result } from '../types/index';

export const sendMessage = (
  { err, result, status }: Result,
  res: Response,
  page?: string,
  offset?: string
) => {
  if (err) {
    res.status(status).json({ err, message: result });
    return;
  }

  if (page && offset && result instanceof Array) {
    const slicePage = Number.parseInt(page, 10);
    const sliceOffset = Number.parseInt(offset, 10);
    result = result.slice(
      slicePage * sliceOffset,
      sliceOffset * (slicePage + 1)
    );
  }

  res.status(status).json(result);
};

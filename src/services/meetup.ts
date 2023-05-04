import { type Request } from 'express';
import path from 'path';

import { INTERNAL_SERVER_ERROR, NOT_FOUND } from '../constants/httpMessages';
import { db, meetupQueries } from '../db';
import { type Result } from '../types';
import { generateReport } from '../utils/generateReport';
import { type CreateProps, type UpdateProps } from './types';

class MeetupService {
  async getOne(id: string): Promise<Result> {
    try {
      const result = await db.one(meetupQueries.getOne, [id]);

      return { result, status: 200 };
    } catch (err) {
      return { result: NOT_FOUND, err: true, status: 404 };
    }
  }

  async getAll(): Promise<Result> {
    try {
      const result = await db.many(meetupQueries.getAll);

      return { result, status: 200 };
    } catch (err) {
      return { result: NOT_FOUND, err: true, status: 404 };
    }
  }

  async delete(id: string): Promise<Result> {
    try {
      const result = await db.one(meetupQueries.delete, [id]);

      return { result, status: 200 };
    } catch (err) {
      return { result: NOT_FOUND, err: true, status: 404 };
    }
  }

  async update(params: UpdateProps): Promise<Result> {
    try {
      const result = await db.one(meetupQueries.update, params);

      return { result, status: 200 };
    } catch (err) {
      return { result: NOT_FOUND, status: 404, err: true };
    }
  }

  async create(params: CreateProps) {
    try {
      const result = await db.one(meetupQueries.create, params);

      return { result, status: 201 };
    } catch (err) {
      return { status: 500, error: true, result: INTERNAL_SERVER_ERROR };
    }
  }

  async generateReport(id: string) {
    try {
      const data = await db.many(meetupQueries.getByParticipant, [id]);

      generateReport(data);

      return {
        status: 200,
        file: path.join(__dirname, '..', '..', 'rep.csv'),
      };
    } catch (err) {
      return {
        status: 200,
        message: (err as Error).message,
      };
    }
  }

  async getAllWithCustomQuery(query: string): Promise<Result> {
    try {
      const result = await db.many(query);

      return { result, status: 200 };
    } catch (err) {
      return { status: 404, err: true, result: NOT_FOUND };
    }
  }
}

export const meetupService = new MeetupService();

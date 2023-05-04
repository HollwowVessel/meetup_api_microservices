import { type Request, type Response } from 'express';
import { verify } from 'jsonwebtoken';

import { REFRESH_TOKEN_SECRET } from '../constants';
import { type IMeetup, type IQuery } from '../schemes/meetup/interfaces';
import { type IJWTInfo } from '../schemes/user/interfaces';
import { meetupService } from '../services/meetup';
import { type Result } from '../types';
import { createSearchQuery } from '../utils/createSearchQuery';
import { sendMessage } from '../utils/sendMessage';

class MeetupController {
  async getMeetups(req: Request, res: Response) {
    let data: Result;

    if (Object.keys(req.query).length === 0) {
      data = await meetupService.getAll();
    } else {
      const query = createSearchQuery(req.query as unknown as IQuery);
      data = await meetupService.getAllWithCustomQuery(query);
    }

    const {
      query: { page, offset },
    } = req;

    sendMessage(data, res, page as string, offset as string);
  }

  async getOneMeetup(req: Request, res: Response) {
    const {
      params: { id },
    } = req;

    const data = await meetupService.getOne(id);

    sendMessage(data, res);
  }

  async deleteMeetup(req: Request, res: Response) {
    const {
      params: { id },
    } = req;

    const data = await meetupService.delete(id);

    sendMessage(data, res);
  }

  async updateMeetup(req: Request, res: Response) {
    const {
      body: { name, description, tags, timestamps, participants },
    } = req;
    const {
      params: { id },
    } = req;

    const params = { name, description, tags, timestamps, participants, id };

    const data = await meetupService.update(params);

    sendMessage(data, res);
  }

  async generateReport(req: Request, res: Response) {
    const { refreshToken } = req.cookies;

    const { id } = verify(refreshToken, REFRESH_TOKEN_SECRET!) as IJWTInfo;

    const { file, status, message } = await meetupService.generateReport(id);

    if (file) {
      res.status(status).sendFile(file);
    } else {
      res.status(status).json({ message });
    }
  }

  async createMeetup(req: Request, res: Response) {
    const { refreshToken } = req.cookies;

    const { id } = verify(refreshToken, REFRESH_TOKEN_SECRET!) as IJWTInfo;

    const {
      body: { name, description, tags, timestamps, participants },
    } = req;

    const params = {
      name,
      description,
      tags,
      timestamps,
      participants,
      creator_id: id,
    };

    const data = await meetupService.create(params);

    sendMessage(data, res);
  }
}

export const meetupController = new MeetupController();

import { Response, Request } from 'express';
import { Errors, errorHandler } from './error.controller';
import User from '../models/user.model';
import Blockage from '../models/blockage.model';
import { Op } from 'sequelize';
import sequelize from '../sequelize';

const block = async (req: Request, res: Response) => {};

const unblock = async (req: Request, res: Response) => {};

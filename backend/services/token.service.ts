import { Model } from 'sequelize';
import { UserType } from '../models/user.model';
import Token, { TokenType } from '../models/token.model';
import { Secret, sign } from 'jsonwebtoken';
import moment from 'moment';

export const generateToken = async (
  user: Model<UserType, UserType>
): Promise<Model<TokenType, TokenType>> => {
  const token = sign(
    { userId: user.get().id },
    process.env.JWT_KEY as Secret
  );

  const newToken = await Token.create({
    userId: user.get().id,
    experationDate: moment().add(7, 'days').toDate(),
    token,
  });

  return newToken;
};

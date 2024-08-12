import { DataTypes, Model } from 'sequelize';
import Token from './user.model';
import sequelize from '../sequelize';

export type UserType = {
  id?: number;
  username: string;
  email: string;
  password: string;
  biography?: string;
  photo?: string;
  token?: string | null;
};

const User = sequelize.define<Model<UserType>>(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Enable auto-increment for the ID field
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    biography: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: 'users',
    timestamps: true,
  }
);

// User.hasOne(Token, { foreignKey: 'token' });

export default User;

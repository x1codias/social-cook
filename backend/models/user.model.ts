import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

export type UserType = {
  id?: number;
  username: string;
  email: string;
  password?: string;
  googleId?: string;
  biography?: string;
  photo?: string;
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
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    biography: {
      type: DataTypes.TEXT,
    },
    photo: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'users',
    timestamps: true,
  }
);

export default User;

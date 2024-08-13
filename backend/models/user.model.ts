import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

export type UserType = {
  id?: number;
  username: string;
  email: string;
  password: string;
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

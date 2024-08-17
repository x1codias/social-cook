import { DataTypes, DateDataType, Model } from 'sequelize';
import User from './user.model';
import sequelize from '../sequelize';

export type TokenType = {
  id: number;
  userId: number;
  experationDate: Date;
  token: string;
};

const Token = sequelize.define<Model<TokenType>>(
  'Token',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Enable auto-increment for the ID field
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      unique: true,
      references: {
        model: User, // 'Users' refers to the User model name
        key: 'id', // 'id' refers to the column name in User model
      },
    },
    experationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    tableName: 'tokens',
    timestamps: true,
  }
);

export default Token;

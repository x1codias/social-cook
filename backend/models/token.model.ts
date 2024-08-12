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
      unique: true,
    },
    experationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'tokens',
    timestamps: true,
  }
);

// Setting up the association
User.hasOne(Token, { foreignKey: 'userId' });
Token.belongsTo(User, { foreignKey: 'userId' });

export default Token;

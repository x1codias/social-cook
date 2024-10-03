import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';
import User from './user.model';

export type FollowageType = {
  userId: number;
  followerId: number;
  count?: number;
};

const Followage = sequelize.define<Model<FollowageType>>(
  'Followage',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    tableName: 'followages',
    timestamps: true,
  }
);

export default Followage;

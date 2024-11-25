import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';
import User from './user.model';

export type FollowageType = {
  userId: number;
  followerId: number;
  count?: number;
  pending: boolean;
  followersCount?: number;
  followingCount?: number;
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
    pending: {
      type: DataTypes.BOOLEAN,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    tableName: 'followages',
    timestamps: true,
    paranoid: true, // Enables the `deletedAt` field for soft deletes
  }
);

export default Followage;

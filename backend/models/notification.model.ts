import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';
import User from './user.model';

export enum NotificationContext {
  comment = 'comment',
  commentLike = 'commentLike',
  rating = 'rating',
  follow = 'follow',
  mention = 'mention',
  favorite = 'favorite',
}

export type NotificationType = {
  id?: number;
  userId: number;
  actorId: number;
  context: NotificationContext;
  read: boolean;
  ratingValue?: number;
  createdAt?: Date;
};

const Notification = sequelize.define<
  Model<NotificationType>
>(
  'Notification',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Enable auto-increment for the ID field
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    actorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    context: {
      type: DataTypes.ENUM(
        ...Object.values(NotificationContext)
      ),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    ratingValue: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    tableName: 'notifications',
    timestamps: true,
    paranoid: true, // Enables the `deletedAt` field for soft deletes
  }
);

export default Notification;

import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';
import User from './user.model';

export enum SettingLangs {
  en = 'en',
  pt = 'pt',
}

export type SettingType = {
  userId: number;
  lang: SettingLangs;
  private: boolean;
};

const Setting = sequelize.define<Model<SettingType>>(
  'Setting',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    lang: {
      type: DataTypes.ENUM(...Object.values(SettingLangs)),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    tableName: 'settings',
    timestamps: true,
    paranoid: true, // Enables the `deletedAt` field for soft deletes
  }
);

export default Setting;

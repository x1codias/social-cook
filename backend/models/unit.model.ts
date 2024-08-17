import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

export type UnitType = {
  id?: number;
  name: string;
  symbol: string;
};

const Unit = sequelize.define<Model<UnitType>>(
  'Unit',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Enable auto-increment for the ID field
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    symbol: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    tableName: 'units',
    timestamps: true,
  }
);

export default Unit;

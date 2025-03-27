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
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    symbol: {
      type: DataTypes.STRING,
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

const insertDefaultUnits = async () => {
  const defaultUnits = [
    {
      name: 'unit',
      symbol: 'uni',
    },
    {
      name: 'kilogram',
      symbol: 'kg',
    },
    {
      name: 'gram',
      symbol: 'g',
    },
    {
      name: 'miligram',
      symbol: 'mg',
    },
    {
      name: 'kilogram',
      symbol: 'kg',
    },
    {
      name: 'litre',
      symbol: 'l',
    },
    {
      name: 'mililitre',
      symbol: 'ml',
    },
    {
      name: 'tableSpoon',
      symbol: 'table sp.',
    },
    {
      name: 'teaSpoon',
      symbol: 'tea sp.',
    },
    {
      name: 'cup',
      symbol: 'cup',
    },
    {
      name: 'pinch',
      symbol: 'pinch',
    },
  ];

  for (const unit of defaultUnits) {
    await Unit.findOrCreate({
      where: { name: unit.name },
      defaults: unit,
    });
  }
};

Unit.sync().then(() => {
  insertDefaultUnits();
});

export default Unit;

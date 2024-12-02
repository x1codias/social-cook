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
      name: 'Unit',
      symbol: 'uni',
    },
    {
      name: 'Kilogram',
      symbol: 'kg',
    },
    {
      name: 'Gram',
      symbol: 'g',
    },
    {
      name: 'Miligram',
      symbol: 'mg',
    },
    {
      name: 'Kilogram',
      symbol: 'kg',
    },
    {
      name: 'Litre',
      symbol: 'l',
    },
    {
      name: 'Mililitre',
      symbol: 'ml',
    },
    {
      name: 'Table Spoon',
      symbol: 'table sp.',
    },
    {
      name: 'Tea Spoon',
      symbol: 'tea sp.',
    },
    {
      name: 'Cup',
      symbol: 'cup',
    },
    {
      name: 'Pinch',
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

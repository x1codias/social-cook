import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

export type IngredientType = {
  id?: number;
  name: string;
};

const Ingredient = sequelize.define<Model<IngredientType>>(
  'Ingredient',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Enable auto-increment for the ID field
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    tableName: 'ingredients',
    timestamps: true,
  }
);

export default Ingredient;

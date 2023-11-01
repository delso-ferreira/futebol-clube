import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

export default class Teams extends Model<InferAttributes<Teams>,
InferCreationAttributes<Teams>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

Teams.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    timestamps: false,
    underscored: true,
    tableName: 'teams',
  },
);

const { Model, DataTypes, Sequelize } = require("sequelize");

const USER_TABLE = "users";

const UserSchema = {
  userId: {
    allowNull: false,
    primaryKey: true,
		field: "user_id",
    type: DataTypes.STRING,
  },
	names: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	lastNames: {
		allowNull: false,
		field: "last_names",
		type: DataTypes.STRING,
	},
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
};

class User extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: "User",
      timestamps: false,
    };
  }
}

module.exports = { USER_TABLE, UserSchema, User };

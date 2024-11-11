const { Model, DataTypes, Sequelize } = require("sequelize");

const USER_TABLE = "users";

const UserSchema = {
  userId: {
    allowNull: false,
    primaryKey: true,
		field: "user_id",
    type: DataTypes.STRING,
  },
	role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: "customer"
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
	recoveryToken: {
		field: "recovery_token",
		allowNull: true,
		type: DataTypes.STRING,
	},
	phone: {
		allowNull: false,
		type: DataTypes.STRING,
		unique: true,
	},
	address: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	isBlock: {
		allowNull: false,
		field: "is_block",
		type: DataTypes.BOOLEAN,
	},
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: Sequelize.NOW,
  },
};

class User extends Model {
  static associate(models) {
		this.hasMany(models.Order, {
			as: "orders",
			foreignKey: "userId",
		});
	}

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

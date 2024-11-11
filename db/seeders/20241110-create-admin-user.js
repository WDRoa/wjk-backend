"use strict";

const bcrypt = require("bcrypt");
const { USER_TABLE } = require("./../models/user.model");
const { config } = require("./../../config/config");

module.exports = {
  up: async queryInterface => {
    const defaultUser = await queryInterface.rawSelect(USER_TABLE, {
      where: {
        email: config.defaultUserEmail
      },
    }, ["user_id"]);

    if (!defaultUser) {
      const hashedPassword = await bcrypt.hash(config.defaultUserPassword, 10);
      await queryInterface.bulkInsert(USER_TABLE, [{
        user_id: "00000000-0000-4000-8000-000000000000",
        role: "admin",
        names: "default",
				last_names: "user",
        email: config.defaultUserEmail,
        password: hashedPassword,
				phone: "1234567890",
				address: "Admin Address",
				is_block: false,
        created_at: new Date(),
				recovery_token: null
      }], {});
    }
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete(USER_TABLE, { email: config.defaultUserEmail }, {});
  }
};

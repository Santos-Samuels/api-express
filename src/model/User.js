const Database = require('../db/config');
const uuid = require('uuid');

module.exports = {
  async list() {
    const db = await Database();
    const data = await db.all(`SELECT * FROM user`);

    await db.close();

    return data.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));
  },

  async create(newUser) {
    const db = await Database();
    const data = await db.all(
      `SELECT email FROM user WHERE email = "${newUser.email}"`,
    );

    if (data.length === 0) {
      const db = await Database();
      const uniqeId = uuid.v4();

      await db.run(
        `INSERT INTO user (
                    id,
                    name,
                    email,
                    password
                ) VALUES (
                    "${uniqeId}",
                    "${newUser.name}",
                    "${newUser.email}",
                    "${newUser.password}"
                )`,
      );
      await db.close();
      return;
    }
  },

  async delete(userId) {
    const db = await Database();

    await db.run(`DELETE FROM user WHERE id = "${userId}"`);

    await db.close();
  },

  async update(updatedUser, userId) {
    const db = await Database();

    await db.run(`UPDATE user SET
        name = "${updatedUser.name}",
        email = "${updatedUser.email}"
        WHERE id = "${userId}"
      `);

    await db.close();
  },

  async getByEmail(email) {
    const db = await Database();
    const data = await db.get(
      `SELECT * FROM user WHERE email = "${email}"`,
    );
    await db.close();

    return data;
  },

  async show(userId) {
    const db = await Database();
    const data = await db.get(
      `SELECT id, name, email FROM user WHERE id = "${userId}"`,
    );
    await db.close();

    return data;
  },

  async getById(userId) {
    const db = await Database();
    const data = await db.get(`SELECT * FROM user WHERE id = "${userId}"`);
    await db.close();

    return data;
  },
};

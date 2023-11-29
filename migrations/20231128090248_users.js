module.exports.up = async (knex) => {
  await knex.schema.hasTable("users").then(async (exists) => {
    if (!exists) {
      await knex.schema
        .createTable("users", async (table) => {
          table.increments('id').notNullable();
          table.string('username').unique().notNullable();
          table.string('email').unique().notNullable();
          table.string('password').notNullable();
          table.enu('role', ['ADMIN','USER']).defaultTo('USER', options={})

        })
        .then(() => {
          console.log("User Table created Successfully");
        })
        .catch((err) => console.log(err));
    }
  });
};

module.exports.down = (knex) => knex.schema.dropTable("users");
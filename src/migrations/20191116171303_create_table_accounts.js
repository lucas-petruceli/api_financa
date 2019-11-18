// eslint-disable-next-line no-undef
exports.up = (knex) => {
  return knex.schema.createTable('accounts' , (t) =>{
      t.increments('id').primary()
      t.string('name').notNull()
      t.integer('user_id')
        .references('id')
        .inTable('users')
        .notNull()
  })
}

// eslint-disable-next-line no-undef
exports.down = (knex) => {
   return knex.schema.dropTable('accounts')
}

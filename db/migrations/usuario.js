exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('usuario', (table) => {
      table.integer('usuario_id').notNull().primary();
      table.string('nombres').notNull();
      table.string('identificacion').notNull();
      table.string('correo').notNull();
      table.string('clave').notNull();
      table.string('monto').notNull();
      table.string('cuenta').notNull();
      table.boolean('habilitado').default(true);
    });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('usuario');
};
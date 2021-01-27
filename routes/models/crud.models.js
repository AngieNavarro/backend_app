const knex = require('../../db/knex');
const crud = {};

crud.create = (table, body) => {
  return knex(table).insert(body).returning('*');
};
crud.findAll = (table) => {
  return knex.select('*').from(table);
};
crud.maximo = (table) => {
  {
    return knex(table).max(`${table}_id`);
  };
}
crud.findOne = (table, parameter = 1, id = 1) => {
  {
    return knex.select('*').from(table).where(parameter, id);
  };
}
crud.findOne1 = (table, parameter = 1, id = 1, parameter1 = 1, id1 = 1) => {
  {
    return knex.select('*').from(table).where(parameter, id).andWhere(parameter1, id1);
  };
}
crud.update = (table, id, body) => {
  return knex(table).where(`${table}_id`, id).update(body);
};

module.exports = crud;
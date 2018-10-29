
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', function(tbl) {
    // id
    tbl.increments();

    // title
    tbl.string('title', 128).notNullable();
    tbl.unique('title');

    // content
    tbl.string('content', 5000).notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('notes');
};

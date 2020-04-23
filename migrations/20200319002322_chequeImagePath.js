
exports.up = function(knex) {
    return knex.schema.table('cheques', function (table) {
        table.string('originalImage')
    })
};

exports.down = function(knex) {
  
};

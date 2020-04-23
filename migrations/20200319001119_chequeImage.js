
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('accounts', function(table) {
        table.increments();
        table.string('name');
        table.string('phone');
        table.string('email');
        table.text('address');
        table.string('isSystemOwner');
        table.string('isDeleted');
        table.string('status');
        table.dateTime('updateDate');
        table.dateTime('insertDate');
    }).createTableIfNotExists('cheques', function(table) {
        table.increments();
        table.string('interlocutor');
        table.string('type');
        table.dateTime('transactionDate');
        table.string('referenceNumber');
        table.decimal('amount');
        table.string('currency');
        table.string('author');
        table.string('location');
        table.string('bank');
        table.string('bankBranch');
        table.string('accountNumber');
        table.string('imagePath');
        table.datetime('dueDate');
        table.dateTime('updateDate');
        table.dateTime('insertDate');
        table.decimal('status');
        table.decimal('isDeleted');
    });
};

exports.down = function(knex) {
  
};

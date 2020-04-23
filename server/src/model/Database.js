const knex = require('knex');
const knexFile = require('../../../knexfile').development;


export class Database {
    connect() {
       return knex(knexFile)
    }

}
const {knex, TABLE_NAMES} = require('connections/knex');

class Subscription {
    static async getAll(tx = knex) {
        return await tx(TABLE_NAMES.SUBSCRIPTIONS).select();
    }

    static async create(query, tx = knex) {
        return await tx(TABLE_NAMES.SUBSCRIPTIONS).insert(query).returning('id');
    }

    static async update(query, params, tx = knex) {
        return await tx(TABLE_NAMES.SUBSCRIPTIONS).where(query).update(params,
            ['lastExecution', 'messageIndex', 'interval']);
    }

    static async remove(query, tx = knex) {
        return await tx(TABLE_NAMES.SUBSCRIPTIONS).where(query).del();
    }

    static async removeAll(tx = knex) {
        return await tx(TABLE_NAMES.SUBSCRIPTIONS).del();
    }
}

module.exports = Subscription;
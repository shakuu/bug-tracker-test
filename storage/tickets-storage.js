const ticketsStorage = (() => {
    'use strict()';
    const idGenerator = require('./idgenerator');
    const _ = require('lodash');
    const tickets = [];

    function getExistingTickets() {
        return new Promise((resolve, reject) => {
            const result = _.cloneDeep(tickets);
            resolve(result);
            return;
        });
    }

    return {
        getExistingTickets
    };
})();

module.exports = ticketsStorage;
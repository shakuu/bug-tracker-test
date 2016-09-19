const storage = (() => {
    'use strict';
    const _ = require('lodash');

    function* IdGenerator() {
        let nextId = 0;
        while (true) {
            yield nextId += 1;
        }
    }

    const userIdGenerator = IdGenerator();
    const existingUsersStorage = [];

    function verifyUser(user) {

    }

    function createUser(user) {
        return new Promise((resolve, reject) => {
            const userWithUsername = findUserByUsername(user.username);
            if (!userWithUsername) {
                user.id = userIdGenerator.next().value;
                existingUsersStorage.push(user);
                resolve(user);
            } else {
                reject(userWithUsername);
            }
        });
    }

    function findUserByUsername(username) {
        const userWithUsername = _.find(existingUsersStorage, (user) => user.username === username);
        return userWithUsername;
    }

    return {
        users: {
            verifyUser,
            createUser
        }
    };
})();

module.exports = storage;
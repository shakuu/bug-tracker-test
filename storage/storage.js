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
        return new Promise((resolve, reject) => {
            const existingUserWithUsername = findUserByUsername(user.username);
            if (existingUserWithUsername) {
                const isValidPassword = verifyPassword(existingUserWithUsername, user);
                if (isValidPassword) {
                    resolve(user);
                }
            }

            reject(user);
        });

        function verifyPassword(existingUser, inputUser) {
            let isMatch = true;
            const wordsCount = existingUser.password.length;
            for (let word = 0; word < wordsCount; word += 1) {
                const existingWord = existingUser.password[word];
                const inputWord = inputUser.password[word];
                if (existingWord != inputWord) {
                    isMatch = false;
                    break;
                }
            }

            return isMatch;
        }
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
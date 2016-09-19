const eventManager = (() => {
    'use strict';
    const INPUT_USERNAME = '#input-username',
        INPUT_PASSWORD = '#input-password',
        INPUT_PATTERN = /^[a-zA-Z0-0@.-_]+$/;

    let cachedScreen;

    function attachLoginButtonsEvents(screen) {
        cachedScreen = {
            screen: screen.loginScreen,
            btnLoginId: screen.btnLoginId,
            btnSignupId: screen.btnSignupId
        };

        return new Promise((resolve, reject) => {
            screen.loginScreen.on('click', cachedScreen.btnLoginId, (ev) => {
                const promise = promiseLogic(apiRequests.loginUser, resolve, reject);
                return promise;
            });

            screen.loginScreen.on('click', cachedScreen.btnSignupId, (ev) => {
                const promise = promiseLogic(apiRequests.createUser, resolve, reject);
                return promise;
            });
        });

        function promiseLogic(apiRequest, resolve, reject) {
            const username = getInput(cachedScreen.screen, INPUT_USERNAME);
            const isValidUsername = checkIfInputIsValid(username);
            if (!isValidUsername) {
                reject('invalid username');
            }

            const password = getInput(cachedScreen.screen, INPUT_PASSWORD);
            const isValidPassword = checkIfInputIsValid(password);
            if (!isValidPassword) {
                reject('invalid password');
            }

            return apiRequest(username, password)
                .then(resolve)
                .catch(reject);
        }

        function getInput(screen, element) {
            const value = $(screen).find(element).val();
            return value;
        }

        function checkIfInputIsValid(value) {
            if (INPUT_PATTERN.test(value)) {
                return true;
            }
        }
    }

    function detachLoginButtonsEvents(buttons) {
        cachedScreen.off('click');
    }

    return {
        attachLoginButtonsEvents,
        detachLoginButtonsEvents
    };
})();
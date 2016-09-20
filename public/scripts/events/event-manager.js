import 'jquery';
import {apiRequests} from 'api-requests';

export const eventManager = (() => {
    'use strict';
    const INPUT_USERNAME = '#input-username',
        INPUT_PASSWORD = '#input-password',
        INPUT_PATTERN = /^[a-zA-Z0-0@.-_]+$/;

    let cachedScreen;

    function attachLoginButtonsEvents(screen, success, fail) {
        cachedScreen = {
            screen: screen.loginScreen,
            btnLoginId: screen.btnLoginId,
            btnSignupId: screen.btnSignupId
        };

        cachedScreen.screen.on('click', cachedScreen.btnLoginId, () => {
            createApiRequest(apiRequests.loginUser, success, fail);
        });

        cachedScreen.screen.on('click', cachedScreen.btnSignupId, () => {
            createApiRequest(apiRequests.createUser, success, fail);
        });

        return screen;

        function createApiRequest(apiRequest, resolve, reject) {
            const username = getInput(cachedScreen.screen, INPUT_USERNAME);
            const isValidUsername = checkIfInputIsValid(username);
            if (!isValidUsername) {
                reject('invalid username');
                return;
            }

            const password = getInput(cachedScreen.screen, INPUT_PASSWORD);
            const isValidPassword = checkIfInputIsValid(password);
            if (!isValidPassword) {
                reject('invalid password');
                return;
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

    function detachLoginButtonsEvents() {
        cachedScreen.off('click');
    }

    return {
        attachLoginButtonsEvents,
        detachLoginButtonsEvents
    };
})();
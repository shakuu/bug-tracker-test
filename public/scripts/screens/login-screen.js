import 'jquery';

const loginScreen = (() => {
    'use strict';
    const loginScreenElementId = '#login-screen';
    const btnLoginId = '#btn-login';
    const btnSignupId = '#btn-signup';

    function displayLoginScreen(template, container) {
        return new Promise((resolve, reject) => {
            if ($(container).length === 0) {
                reject('could not find container');
            }

            const loginScreen = $($(template).text());
            if (loginScreen.length === 0) {
                reject('could not find template');
            }

            const btnLogin = $(loginScreen).find(btnLoginId);
            if (btnLogin.length === 0) {
                reject(`could not find ${btnLoginId}`);
            }

            const btnSignup = $(loginScreen).find(btnSignupId);
            if (btnSignup.length === 0) {
                reject(`could not find ${btnSignupId}`);
            }

            const toResolve = {
                loginScreen,
                btnLoginId,
                btnSignupId
            };

            $(container).append(loginScreen);
            resolve(toResolve);
        });
    }

    function hideLoginScreen(container) {
        return new Promise((resolve, reject) => {
            if ($(container).length === 0) {
                reject('could not find container');
            }

            const loginScreen = $(container).find(loginScreenElementId);
            if (loginScreen.length === 0) {
                reject('could not find element');
            }

            loginScreen.remove();
            resolve(container);
        });
    }

    // function attachEventToButton(container, buttonId, callback) {
    //     const buttonElement = container.find(buttonId);
    //     if (buttonElement.length === 0) {
    //         return false;
    //     }

    //     container.on('click', buttonId, callback);
    //     return true;
    // }

    // function signInUser(event) {
    //     console.log('signInUser');
    // }

    // function createUser(event) {
    //     console.log('createUser');
    // }

    return {
        displayLoginScreen,
        hideLoginScreen
    };
})();

export {
    loginScreen
}
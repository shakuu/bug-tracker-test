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
                return;
            }

            const loginScreen = $($(template).text());
            if (loginScreen.length === 0) {
                reject('could not find template');
                return;
            }

            const btnLogin = $(loginScreen).find(btnLoginId);
            if (btnLogin.length === 0) {
                reject(`could not find ${btnLoginId}`);
                return;
            }

            const btnSignup = $(loginScreen).find(btnSignupId);
            if (btnSignup.length === 0) {
                reject(`could not find ${btnSignupId}`);
                return;
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
                return;
            }

            const loginScreen = $(container).find(loginScreenElementId);
            if (loginScreen.length === 0) {
                reject('could not find element');
                return;
            }

            loginScreen.remove();
            resolve(container);
        });
    }

    return {
        displayLoginScreen,
        hideLoginScreen
    };
})();

export {
    loginScreen
};
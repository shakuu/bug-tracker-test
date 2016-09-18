const loginScreen = (() => {
    'use strict';
    const loginScreenElementId = '#login-screen';

    function displayLoginScreen(template, container) {
        return new Promise((resolve, reject) => {
            if ($(container).length === 0) {
                reject('could not find container');
            }

            const loginScreen = $($(template).text());
            if (loginScreen.length === 0) {
                reject('could not find template');
            }

            $(container).append(loginScreen);
            resolve(loginScreen);
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

    return {
        displayLoginScreen,
        hideLoginScreen
    };
})();
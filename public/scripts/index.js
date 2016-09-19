$(() => {
    'use strict';
    const contentContainer = $('#content'),
        loginScreenTemplate = $('#login-screen-template');

    loginScreen.displayLoginScreen(loginScreenTemplate, contentContainer)
        .then((screen) => {
            eventManager.attachLoginButtonsEvents(screen, loginSucceeded, loginFailed);
            return screen;
        })
        .then(console.log)
        .catch(console.log);

    function loginSucceeded() {
        console.log('success');
    }

    function loginFailed() {
        console.log('failed');
    }
});
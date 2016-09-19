$(() => {
    'use strict';
    const contentContainer = $('#content'),
        loginScreenTemplate = $('#login-screen-template');

    loginScreen.displayLoginScreen(loginScreenTemplate, contentContainer)
        .then(eventManager.attachLoginButtonsEvents)
        .then(console.log)
        .catch(console.log);
});
$(() => {
    'use strict';
    const contentContainer = $('#content'),
        loginScreenTemplate = $('#login-screen-template');

    loginScreen.displayLoginScreen(loginScreenTemplate, contentContainer)
        .then(eventManager.attachLoginButtonsEvents)
        .catch(console.log);
});
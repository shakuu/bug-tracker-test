$(() => {
    'use strict';
    const contentContainer = $('#content'),
        loginScreenTemplate = $('#login-screen-template');

    loginScreen.displayLoginScreen(loginScreenTemplate, contentContainer)
        .then(console.log)
        .catch(console.log);
});
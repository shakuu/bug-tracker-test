$(() => {
    'use strict';
    const contentContainer = $('#content'),
        loginScreenTemplate = $('#login-screen-template');

    loginScreen.displayLoginScreen(loginScreenTemplate, contentContainer)
        .catch(console.log);
});
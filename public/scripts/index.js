import 'jquery';
import {loginScreen} from 'loginscreen';
import {eventManager} from 'event-manager';

$(() => {
    'use strict';

    const contentContainer = $('#content'),
        loginScreenTemplate = $('#login-screen-template');

    loginScreen.displayLoginScreen(loginScreenTemplate, contentContainer)
        .then((screen) => {
            eventManager.attachLoginButtonsEvents(screen, loginSucceeded, loginFailed);
            return screen;
        });

    function loginSucceeded() {
        console.log('success');
    }

    function loginFailed() {
        console.log('failed');
    }
});
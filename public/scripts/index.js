import 'jquery';
import {loginScreen} from 'login-screen';
import {ticketsScreen} from 'tickets-screen';
import {eventManager} from 'event-manager';

$(() => {
    'use strict';

    const contentContainer = $('#content'),
        loginScreenTemplate = $('#login-screen-template'),
        ticketsScreenTemplate = $('#tickets-screen-template');

    function tickets(user) {
        ticketsScreen.displayTicketsScreen(ticketsScreenTemplate, contentContainer)
            .then(attachUser);

        function attachUser(screen) {
            $(screen.usernameField).html(user.username);
        }
    }

    function login() {
        loginScreen.displayLoginScreen(loginScreenTemplate, contentContainer)
            .then((screen) => {
                eventManager.attachLoginButtonsEvents(screen, loginSucceeded, loginFailed);
                return screen;
            });

        function loginSucceeded(user) {
            loginScreen.hideLoginScreen(contentContainer);
            tickets(user);
            console.log(user);
        }

        function loginFailed() {
            console.log('failed');
        }
    }

    login();
});
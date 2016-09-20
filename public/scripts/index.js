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
            .then(attachUser)
            .then(attachLogOutButtonEvent);

        function attachUser(screen) {
            $(screen.usernameField).html(user.username);
            return screen;
        }

        function attachLogOutButtonEvent(screen) {
            const button = $(screen.btnLogout);
            button.on('click', logOut);

            function logOut() {
                button.off('click');
                contentContainer.html('');
                login();
            }
        }
    }

    function login() {
        loginScreen.displayLoginScreen(loginScreenTemplate, contentContainer)
            .then((screen) => {
                eventManager.attachLoginButtonsEvents(screen, loginSucceeded, loginFailed);
                return screen;
            });

        function loginSucceeded(user) {
            if (user.status) {
                loginScreen.hideLoginScreen(contentContainer);
                tickets(user);
            } else {
                const message = $($('#warning-message-template').text());
                message.append(user.message);
                message.css({
                    'margin-top': '20px'
                });

                const container = $('#login-screen').find('#messages');
                container.children().remove();
                container.append(message);
            }

            console.log(user);
        }

        function loginFailed(error) {
            const message = $($('#warning-message-template').text());
                message.append(error);
                message.css({
                    'margin-top': '20px'
                });

                const container = $('#login-screen').find('#messages');
                container.children().remove();
                container.append(message);
        }
    }

    login();
});
import 'jquery';
import {loginScreen} from 'login-screen';
import {ticketsScreen} from 'tickets-screen';
import {eventManager} from 'event-manager';
import {apiRequests} from 'api-requests';

$(() => {
    'use strict';

    const contentContainer = $('#content'),
        loginScreenTemplate = $('#login-screen-template'),
        ticketsScreenTemplate = $('#tickets-screen-template');

    function tickets(user) {
        let cachedScreen;
        ticketsScreen.displayTicketsScreen(ticketsScreenTemplate, contentContainer)
            .then(attachUser)
            .then(loadExistingTickets)
            .then(attachLogOutButtonEvent)
            .then(attachNewButtonEvent)
            .then((screen) => {
                cachedScreen = screen;
            });

        function attachUser(screen) {
            $(screen.usernameField).html(user.username);
            return screen;
        }

        function loadExistingTickets(screen) {
            apiRequests.getAllTickets()
                .then(displayTickets)
                .catch(console.log);

            return screen;
        }

        function attachNewButtonEvent(screen) {
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

            return screen;
        }

        function displayTickets(tickets) {
            console.log(tickets);
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
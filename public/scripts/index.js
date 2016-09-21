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
            .then((screen) => {
                cachedScreen = screen;
                return screen;
            })
            .then(attachUser)
            .then(loadExistingTickets)
            .then(attachLogOutButtonEvent)
            .then(attachNewButtonEvent);


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
            if (tickets.length === 0) {
                tickets = [
                    {
                        id: 1,
                        title: 'test',
                        content: 'delete me',
                        author: 'unknown',
                        date: 'unknown'
                    },
                    {
                        id: 2,
                        title: 'test',
                        content: 'delete me',
                        author: 'unknown',
                        date: 'unknown'
                    }];
            }

            const container = $(cachedScreen.ticketsScreen).find('#tickets-container');

            const ticketTemplate = $($('#ticket-template').text());
            tickets.forEach(ticket => {
                ticketTemplate.find('#ticket-id').html(ticket.id);
                ticketTemplate.find('#ticket-title').html(ticket.title);
                ticketTemplate.find('#content').html(ticket.content);
                ticketTemplate.find('#author').html(ticket.author);
                ticketTemplate.find('#date').html(ticket.date);

                const clone = ticketTemplate.clone(true);
                container.append(clone);
            });

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
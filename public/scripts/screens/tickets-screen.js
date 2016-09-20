import 'jquery';

const ticketsScreen = (() => {
    'use strict()';

    const TICKETS_SCREEN_TEMPLATE_ID = '#tickets-screen-template';

    function displayTicketsScreen(template, container) {
        return new Promise((resolve, reject) => {
            if ($(container).length === 0) {
                reject('could not find container')
                return;
            }

            const ticketsScreen = $($(template).text());
            if (ticketsScreen.length === 0) {
                reject('could not find template');
                return;
            }

            const usernameField = $(ticketsScreen).find('#username');
            if (usernameField.length === 0) {
                reject('could not find username field');
                return;
            }

            const btnLogout = $(ticketsScreen).find('#btn-logout');
            if (btnLogout.length === 0) {
                reject('could not find logout button');
                return;
            }

            const toResolve = {
                ticketsScreen,
                usernameField,
                btnLogout
            };

            $(container).append(ticketsScreen);
            resolve(toResolve);
        });
    }

    return {
        displayTicketsScreen
    };
})();

export {ticketsScreen};
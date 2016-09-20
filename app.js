const express = require('express');
const bodyParser = require('body-parser');
const usersStorage = require('./storage/storage');
const ticketsStorage = require('./storage/tickets-storage');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/api/tickets', (request, response) => {
    ticketsStorage.getExistingTickets()
        .then((tickets) => {
            response
                .status(200)
                .json(tickets);
        })
        .catch((error) => {
            response
                .status(400)
                .json(error);
        });
});

app.put('/api/user', (request, response) => {
    const user = {
        username: request.body.username,
        password: request.body.password
    };

    usersStorage.users.verifyUser(user)
        .then((user) => {
            response
                .status(202)
                .json(user);
        })
        .catch((error) => {
            response
                .status(400)
                .json(error);
        });
});

app.post('/api/user', (request, response) => {
    const user = {
        username: request.body.username,
        password: request.body.password
    };

    usersStorage.users.createUser(user)
        .then((user) => {
            response
                .status(201)
                .json(user);
        })
        .catch((error) => {
            response
                .status(400)
                .json(error);
        });
});

const port = 8085;
app.listen(port, () => {
    console.log(`App running on: http://localhost:${port}/`);
});